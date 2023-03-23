import { Contract, ethers } from 'ethers';
import masterchefAbi from '../abi/MasterChef.json';
import { google } from 'googleapis';
import os from 'os';
import fs from 'fs';
import inquirer from 'inquirer';
import { FarmAdjustment } from './index';
import { JWT } from 'google-auth-library';
import { googleJwtClient } from './google-jwt-client';

type GoogleSheetCredentials = {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
};
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const DEFAULT_CREDENTIAL_DIR = `${os.homedir()}/.stage-gauge-txs`;
const DEFAULT_CREDENTIAL_FILE = 'credentials.json';
const DEFAULT_FULL_CREDENTIAL_PATH = `${DEFAULT_CREDENTIAL_DIR}/${DEFAULT_CREDENTIAL_FILE}`;

export async function createGaugeTxsFromGoogleSheet(
    sheetName: string,
    credentialFile?: string,
): Promise<FarmAdjustment[]> {
    let credentials: GoogleSheetCredentials;
    let jwtClient: JWT;

    if (credentialFile) {
        if (!fs.existsSync(credentialFile)) {
            throw new Error(`Config file does not exist at path ${credentialFile}`);
        }
        credentials = JSON.parse(fs.readFileSync(credentialFile, 'utf-8'));
        jwtClient = await googleJwtClient.getAuthorizedSheetsClient(credentials.client_email, credentials.private_key);
    } else if (fs.existsSync(DEFAULT_FULL_CREDENTIAL_PATH)) {
        credentials = JSON.parse(fs.readFileSync(DEFAULT_FULL_CREDENTIAL_PATH, 'utf-8'));
        jwtClient = await googleJwtClient.getAuthorizedSheetsClient(credentials.client_email, credentials.private_key);
    } else {
        throw Error('Could not find credentials file.');
    }

    return createJsonOutput(jwtClient, sheetName, '1PwKizspl84t7AG2QlQMlr77OxjcuEY_mq8JwTu9ptQM', '!A2:K');
}

async function createJsonOutput(
    auth: any,
    sheetName: string,
    sheetId: string,
    sheetRange: string,
): Promise<FarmAdjustment[]> {
    console.log('Generating farm adjustments from google sheet.');
    const sheets = google.sheets({ version: 'v4' });
    let result;
    try {
        result = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}${sheetRange}`,
            auth: auth,
        });
    } catch (e) {
        throw Error('Could not find sheet name provided.');
    }
    const rows = result.data.values?.filter((row) => row.length >= 11);

    if (rows?.length) {
        console.log('Comparing google sheet entries with master chef contract...');
        const masterchefContract = new Contract(
            '0x8166994d9ebbe5829ec86bd81258149b87facfd3',
            masterchefAbi,
            new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools'),
        );

        let farmAdjustments: FarmAdjustment[] = [];

        let unchangedPoolCount = 0;
        let editPoolCount = 0;
        let newPoolCount = 0;
        for (const row of rows) {
            const isNew = row[0];
            const poolName = row[1];
            const masterchefPoolId = row[2];
            const newAllocationPoints = row[8];
            const lpToken = row[10];

            if (masterchefPoolId) {
                const poolInfo = await masterchefContract.poolInfo(masterchefPoolId);
                const currentAllocationPoints = poolInfo.allocPoint.toString();

                if (newAllocationPoints !== currentAllocationPoints) {
                    farmAdjustments.push({
                        type: 'edit',
                        pid: masterchefPoolId,
                        allocationPoints: parseFloat(newAllocationPoints),
                    });
                    console.log(
                        `Change alloc for pool ${poolName} from ${currentAllocationPoints} to ${newAllocationPoints} `,
                    );
                    editPoolCount++;
                } else {
                    console.log(`Pool ${poolName} has not changed. Skipping...`);
                    unchangedPoolCount++;
                }
            } else if (isNew) {
                farmAdjustments.push({
                    type: 'add',
                    allocationPoints: parseFloat(newAllocationPoints),
                    lpToken: lpToken,
                });
                console.log(
                    `Adding new farm for ${poolName} with lpToken ${lpToken} and ${newAllocationPoints} points`,
                );
                newPoolCount++;
            } else {
                throw new Error(`Row has nether a new flag or a pool id: ${row}`);
            }
        }
        console.log(
            `\n------------------------------------------------------------\nTotal pools: ${rows.length}\nUnchanged pools: ${unchangedPoolCount}\nNew pools: ${newPoolCount}\nEdited pools: ${editPoolCount}\n------------------------------------------------------------\n`,
        );

        console.log(`Double checking from masterchef....`);

        const poolLength = await masterchefContract.poolLength();

        for (let poolId = 0; poolId < poolLength; poolId++) {
            const poolInfo = await masterchefContract.poolInfo(poolId);
            const allocPointForPool = poolInfo.allocPoint;

            const poolInSheet = rows.find((row) => row[2] === poolId.toString());
            if (!poolInSheet && allocPointForPool > 0) {
                console.log(
                    `ATTENTION: Did not find pool id ${poolId} in sheet. Alloc points on MC are ${allocPointForPool}`,
                );
            }
        }
        console.log(`Done.`);

        const writeFileAnswer = await inquirer.prompt([
            { type: 'confirm', name: 'writeFile', message: 'Write changes to file', default: true },
            {
                type: 'input',
                when: (answers) => answers.writeFile,
                name: 'fileName',
                message: 'File name',
                default: `tx_${new Date().getTime()}.json`,
            },
        ]);
        if (writeFileAnswer.writeFile) {
            fs.writeFileSync(writeFileAnswer.fileName, JSON.stringify(farmAdjustments, null, 2));
        }
        return farmAdjustments;
    } else {
        throw new Error('No data found.');
    }
}

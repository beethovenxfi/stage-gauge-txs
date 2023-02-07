import { Contract, ethers } from 'ethers';
import masterchefAbi from '../abi/MasterChef.json';
import { google } from 'googleapis';
import os from 'os';
import fs from 'fs';
import inquirer from 'inquirer';
import { FarmAdjustment } from './index';

type GoogleSheetsApiConfig = {
    project: {
        clientId: string;
        clientSecret: string;
        redirectUri?: string;
        sheetId: string;
        sheetRange: string;
    };
    credentials: {
        refresh_token?: string | null;
        expiry_date?: number | null;
        access_token?: string | null;
        token_type?: string | null;
        id_token?: string | null;
        scope?: string;
    };
};

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const DEFAULT_CONFIG_DIR = `${os.homedir()}/.stage-gauge-txs`;
const DEFAULT_CONFIG_FILE = 'config.json';
const DEFAULT_FULL_CONFIG_PATH = `${DEFAULT_CONFIG_DIR}/${DEFAULT_CONFIG_FILE}`;

export async function createGaugeTxsFromGoogleSheet(sheetName: string, configFile?: string): Promise<FarmAdjustment[]> {
    let oAuth2Client;
    let config: GoogleSheetsApiConfig;

    if (configFile) {
        if (!fs.existsSync(configFile)) {
            throw new Error(`Config file does not exist at path ${configFile}`);
        }
        config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
        oAuth2Client = new google.auth.OAuth2(
            config.project.clientId,
            config.project.clientSecret,
            config.project.redirectUri ?? 'http://localhost',
        );
        oAuth2Client.setCredentials(config.credentials);
    } else if (fs.existsSync(DEFAULT_FULL_CONFIG_PATH)) {
        config = JSON.parse(fs.readFileSync(DEFAULT_FULL_CONFIG_PATH, 'utf-8'));
        oAuth2Client = new google.auth.OAuth2(
            config.project.clientId,
            config.project.clientSecret,
            config.project.redirectUri ?? 'http://localhost',
        );
        oAuth2Client.setCredentials(config.credentials);
    } else {
        console.log('Configuring you google sheets access.');
        if (!fs.existsSync(DEFAULT_CONFIG_DIR)) {
            fs.mkdirSync(DEFAULT_CONFIG_DIR, {});
        }
        const { clientId, clientSecret, sheetId, sheetRange } = await inquirer.prompt([
            {
                type: 'input',
                name: 'clientId',
                message: 'Client ID',
                default: '405692522261-v1prtn1h5oqqt7c3n81k2mue6ne269g4.apps.googleusercontent.com',
            },
            {
                type: 'input',
                name: 'clientSecret',
                message: 'Client Secret',
            },
            {
                type: 'input',
                name: 'sheetId',
                message: 'Sheet ID',
                default: '1PwKizspl84t7AG2QlQMlr77OxjcuEY_mq8JwTu9ptQM',
            },
            {
                type: 'input',
                name: 'sheetRange',
                message: 'Sheet range',
                default: '!A2:K',
            },
        ]);

        oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, 'http://localhost');
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('Authorize this app by visiting this url:', authUrl);

        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Find code in URL at last redirect after code=<CODE>. Enter here: ',
            },
        ]);

        const tokenResponse = await oAuth2Client.getToken(answer.code);
        config = {
            project: {
                clientId,
                clientSecret,
                sheetId,
                sheetRange,
            },
            credentials: tokenResponse.tokens,
        };
        console.log(`Writing config to ${DEFAULT_FULL_CONFIG_PATH}`);
        fs.writeFileSync(DEFAULT_FULL_CONFIG_PATH, JSON.stringify(config));
        oAuth2Client.setCredentials(tokenResponse.tokens);
    }

    return createJsonOutput(oAuth2Client, sheetName, config.project.sheetId, config.project.sheetRange);
}

async function createJsonOutput(
    auth: any,
    sheetName: string,
    sheetId: string,
    sheetRange: string,
): Promise<FarmAdjustment[]> {
    console.log('Generating farm adjustments from google sheet.');
    const sheets = google.sheets({ version: 'v4', auth });
    let result;
    try {
        result = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}${sheetRange}`,
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

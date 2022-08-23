import { BigNumber, Contract, ethers } from 'ethers';
import masterchefAbi from '../abi/MasterChef.json';
import { google } from 'googleapis';
import credentials from '../credentials.json';

const fs = require('fs');
const readline = require('readline');
// const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

export async function createChangefile(sheetName: string): Promise<string> {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    let authToken;
    let filename = '';

    try {
        authToken = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(authToken));
    } catch (e) {
        console.log(`No previous token stored. Please authorize before use.`);
    }

    if (!authToken) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Find code in URL at last redirect after code=<CODE>. Enter here: ', (code: any) => {
            rl.close();
            oAuth2Client.getToken(code, async (err: any, token: any) => {
                if (err) {
                    return console.error('Error while trying to retrieve access token', err);
                }
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Token stored to', TOKEN_PATH);
                });
            });
        });
    } else {
        filename = `tx_${new Date().getTime()}.json`;
        await createJsonOutput(oAuth2Client, sheetName, filename);
    }

    return filename;
}

async function createJsonOutput(auth: any, sheetName: string, filename: string): Promise<void> {
    const sheets = google.sheets({ version: 'v4', auth });
    let result;
    try {
        result = await sheets.spreadsheets.values.get({
            spreadsheetId: '1PwKizspl84t7AG2QlQMlr77OxjcuEY_mq8JwTu9ptQM',
            range: `${sheetName}!A2:J`,
        });
    } catch (e) {
        throw Error('Could not find sheetname provided.');
    }
    const rows: string[] = result.data.values as unknown as string[];

    if (rows.length) {
        const masterchefContract = new Contract(
            '0x8166994d9ebbe5829ec86bd81258149b87facfd3',
            masterchefAbi,
            new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools'),
        );

        let outJson = [];

        for (const row of rows) {
            const isNew = row[0];
            const poolName = row[1];
            const masterchefPoolId = row[2];
            const newAllocationPoints = row[7];
            const lpToken = row[9];

            if (masterchefPoolId) {
                const poolInfo = await masterchefContract.poolInfo(masterchefPoolId);
                const currentAllocationPoints = poolInfo.allocPoint.toString();

                if (newAllocationPoints !== currentAllocationPoints) {
                    outJson.push({
                        type: 'edit',
                        pid: parseFloat(masterchefPoolId),
                        allocationPoints: parseFloat(newAllocationPoints),
                    });
                    console.log(
                        `Need to change alloc for pool ${poolName} to ${newAllocationPoints} from ${currentAllocationPoints}`,
                    );
                }
            } else if (isNew) {
                outJson.push({
                    type: 'add',
                    allocationPoints: parseFloat(newAllocationPoints),
                    lpToken: lpToken,
                });
                console.log(`Adding new farm for ${poolName} with lpToken ${lpToken}`);
            } else {
                throw new Error(`Row had both a new flag as well as a pool id: ${row}`);
            }
        }
        fs.writeFileSync(filename, JSON.stringify(outJson, null, 2));
    } else {
        console.log('No data found.');
    }
}

import os from 'os';
import fs from 'fs';
import inquirer from 'inquirer';
import { google } from 'googleapis';
import moment from 'moment';
import { parseUnits } from 'ethers/lib/utils';
import { googleJwtClient } from './google-jwt-client';
import { JWT } from 'google-auth-library';

interface SafeTransactionBatch {
    version: string;
    chainId: string;
    createdAt: number;
    meta: Meta;
    transactions: Transaction[];
}

interface Meta {
    name: string;
    description: string;
    txBuilderVersion: string;
    createdFromSafeAddress: string;
    createdFromOwnerAddress: string;
    checksum: string;
}

interface Transaction {
    to: string;
    value: string;
    data: any;
    contractMethod: ContractMethod;
    contractInputsValues: ContractInputsValues;
}

interface ContractMethod {
    inputs: Input[];
    name: string;
    payable: boolean;
}

interface Input {
    name: string;
    type: string;
    internalType?: string;
}

export interface ContractInputsValues {
    spender?: string;
    amount?: string;
    _reward_token?: string;
    _amount?: string;
}

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

const DEFAULT_CONFIG_DIR = `${os.homedir()}/.stage-gauge-txs`;
const DEFAULT_CREDENTIALS_FILE = 'credentials.json';
const DEFAULT_FULL_CREDENTIAL_PATH = `${DEFAULT_CONFIG_DIR}/${DEFAULT_CREDENTIALS_FILE}`;

export async function createTxnBatchJsonFromGoogleSheet(sheetName: string, credentialsFile?: string): Promise<void> {
    let credentials: GoogleSheetCredentials;
    let jwtClient: JWT;

    if (credentialsFile) {
        if (!fs.existsSync(credentialsFile)) {
            throw new Error(`Config file does not exist at path ${credentialsFile}`);
        }
        credentials = JSON.parse(fs.readFileSync(credentialsFile, 'utf-8'));
        jwtClient = await googleJwtClient.getAuthorizedSheetsClient(credentials.client_email, credentials.private_key);
    } else if (fs.existsSync(DEFAULT_FULL_CREDENTIAL_PATH)) {
        credentials = JSON.parse(fs.readFileSync(DEFAULT_FULL_CREDENTIAL_PATH, 'utf-8'));
        jwtClient = await googleJwtClient.getAuthorizedSheetsClient(credentials.client_email, credentials.private_key);
    } else {
        throw Error('Could not find credentials file.');
    }

    createJsonOutput(jwtClient, sheetName, '1rhIgAvr0BQ2EPATqGyisiQEV0XFVMqmGgDuVpO9-inU', '!A27:G');
}

async function createJsonOutput(auth: any, sheetName: string, sheetId: string, sheetRange: string): Promise<void> {
    console.log('Generating gauge txn json for OP gauges.');
    const sheets = google.sheets({ version: 'v4', auth });
    let result;
    try {
        result = await sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: sheetId,
            range: `${sheetName}${sheetRange}`,
            valueRenderOption: 'UNFORMATTED_VALUE',
        });
    } catch (e) {
        throw Error('Could not find sheet name provided.');
    }
    const rows = result.data.values;

    if (rows?.length) {
        let gaugeTxns: Transaction[] = [];

        for (const row of rows) {
            const gaugeAddress: string = row[1];
            const rewardTokenAddress: string = row[3];
            const rewardTokenDecimals: number = row[4];
            const rewardTokenAmount: number = row[5];
            const epochStart: string = row[6];

            const epochStartTimestamp = moment(epochStart, 'MM/DD/YYYY').endOf('day').unix();
            const now = moment().unix();

            if (now < epochStartTimestamp) {
                const rewardTokenAmountScaled = parseUnits(`${rewardTokenAmount}`, rewardTokenDecimals);

                // add the approve transcation
                gaugeTxns.push({
                    to: rewardTokenAddress,
                    value: '0',
                    data: null,
                    contractMethod: {
                        inputs: [
                            {
                                internalType: 'address',
                                name: 'spender',
                                type: 'address',
                            },
                            {
                                internalType: 'uint256',
                                name: 'amount',
                                type: 'uint256',
                            },
                        ],
                        name: 'approve',
                        payable: false,
                    },
                    contractInputsValues: {
                        spender: gaugeAddress,
                        amount: rewardTokenAmountScaled.toString(),
                    },
                });

                // add deposit_reward_token transaction
                gaugeTxns.push({
                    to: gaugeAddress,
                    value: '0',
                    data: null,
                    contractMethod: {
                        inputs: [
                            {
                                name: '_reward_token',
                                type: 'address',
                            },
                            {
                                name: '_amount',
                                type: 'uint256',
                            },
                        ],
                        name: 'deposit_reward_token',
                        payable: false,
                    },
                    contractInputsValues: {
                        _reward_token: rewardTokenAddress,
                        _amount: rewardTokenAmountScaled.toString(),
                    },
                });
            }
        }

        if (gaugeTxns.length > 0) {
            const transactionBatch: SafeTransactionBatch = {
                version: '1.0',
                chainId: '10',
                createdAt: 1678892613523,
                meta: {
                    name: 'Transactions Batch',
                    description: '',
                    txBuilderVersion: '1.13.3',
                    createdFromSafeAddress: '0x2a185C8A3C63d7bFe63aD5d950244FFe9d0a4b60',
                    createdFromOwnerAddress: '',
                    checksum: '0x5b857aee1f57636d022fbb0b9a7bc765a6de68875ed045c36dd1011ce10aabac',
                },
                transactions: gaugeTxns,
            };

            console.log(`Total transactions: ${gaugeTxns.length}`);

            const writeFileAnswer = await inquirer.prompt([
                { type: 'confirm', name: 'writeFile', message: 'Write changes to file', default: true },
                {
                    type: 'input',
                    when: (answers) => answers.writeFile,
                    name: 'fileName',
                    message: 'File name',
                    default: `transactionBatch_${new Date().getTime()}.json`,
                },
            ]);
            if (writeFileAnswer.writeFile) {
                fs.writeFileSync(writeFileAnswer.fileName, JSON.stringify(transactionBatch, null, 2));
            }
        } else {
            console.log(`No transactions found`);
        }
    } else {
        throw new Error('No data found.');
    }
}

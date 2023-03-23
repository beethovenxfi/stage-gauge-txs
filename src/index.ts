#! /usr/bin/env node

import * as path from 'path';
import { program } from 'commander';
import * as fs from 'fs';
import moment from 'moment';
import { BigNumberish, ethers } from 'ethers';
import { getConfig } from './config';
import masterChefOperatorAbi from '../abi/MasterChefOperator.json';
import { createGaugeTxsFromGoogleSheet } from './create-gauge-txs-from-google-sheet';
import inquirer from 'inquirer';
import { createTxnBatchJsonFromGoogleSheet } from './create-op-safe-json';

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:1248');
const signer = provider.getSigner();

type FarmAdd = {
    type: 'add';
    lpToken?: string;
    allocationPoints?: number;
    rewarder?: string;
};
type FarmEdit = {
    type: 'edit';
    pid?: string;
    allocationPoints?: number;
    rewarder?: string;
};
export type FarmAdjustment = FarmAdd | FarmEdit;

async function main() {
    program
        .requiredOption('-s, --source <source>', 'source json (relative pt) or google sheets page ID')
        .option('-c, --credential <credential>', 'Credential file for api access to google sheets')
        .option('-n, --network <network>', 'Network', 'fantom')
        .option(
            '-e, --eta <eta>',
            'Eta (default 8h)',
            moment()
                .add(8 * 60, 'minutes')
                .unix()
                .toString(),
        );

    program.parse(process.argv);

    const programOptions = program.opts();
    const config = getConfig(programOptions.network);
    let farmAdjustments: FarmAdjustment[];

    if (programOptions.network === 'fantom') {
        if (programOptions.source.endsWith('.json')) {
            const filePath = path.join(process.cwd(), programOptions.source);
            farmAdjustments = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } else {
            farmAdjustments = await createGaugeTxsFromGoogleSheet(programOptions.source);
            const confirmProceed = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'proceed',
                    message: 'Farm adjustments generated from google sheet, please review! Proceed ?',
                },
            ]);
            if (!confirmProceed.proceed) {
                return;
            }
        }

        const operator = new ethers.Contract(
            config.contractAddresses.MasterChefOperator,
            masterChefOperatorAbi,
            signer,
        );

        const farmAdditions: Array<{
            lpToken: string;
            allocationPoints: BigNumberish;
            rewarder: string;
        }> = [];
        const farmModifications: Array<{
            pid: BigNumberish;
            allocationPoints: BigNumberish;
            rewarder: string;
            overwriteRewarder: boolean;
        }> = [];

        for (let farmAdjustment of farmAdjustments) {
            if (farmAdjustment.type === 'add') {
                const { lpToken, allocationPoints, rewarder } = farmAdjustment;
                if (!(lpToken != null && allocationPoints != null)) {
                    throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
                }
                farmAdditions.push({
                    lpToken,
                    allocationPoints,
                    rewarder: rewarder ?? ethers.constants.AddressZero,
                });
            } else {
                const { pid, allocationPoints, rewarder } = farmAdjustment;
                if (!(pid != null && allocationPoints != null)) {
                    throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
                }
                farmModifications.push({
                    pid,
                    allocationPoints,
                    rewarder: rewarder ?? ethers.constants.AddressZero,
                    overwriteRewarder: !!rewarder,
                });
            }
        }

        console.log(`Staging farm adjustments with eta ${programOptions.eta}`);
        if (farmAdditions.length > 0) {
            console.log('staging farm additions, please sign...');
            const stageFarmAdditionsTx = await operator.stageFarmAdditions(farmAdditions, programOptions.eta);
            await stageFarmAdditionsTx.wait();
            console.log('done');
        }
        if (farmModifications.length > 0) {
            console.log('staging farm modifications, please sign...');
            const stageFarmModificationsTx = await operator.stageFarmModifications(
                farmModifications,
                programOptions.eta,
            );
            await stageFarmModificationsTx.wait();
            console.log('done');
        }
    } else {
        if (programOptions.source.endsWith('.json')) {
            throw Error(`Can't use json file on OP. Only sheet allowed.`);
        } else {
            await createTxnBatchJsonFromGoogleSheet(programOptions.source);
        }
    }
}

main().catch((error) => console.error(error));

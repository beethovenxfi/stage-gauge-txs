#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const moment_1 = __importDefault(require("moment"));
const hardhat_1 = require("hardhat");
const config_1 = require("../config");
// @ts-ignore
// import ethProvider from "eth-provider";
// import {ethers} from "hardhat";
// const frame = ethProvider("frame");
const provider = new hardhat_1.ethers.providers.JsonRpcProvider("http://127.0.0.1:1248");
const signer = provider.getSigner();
async function main() {
    commander_1.program
        .requiredOption("-f, --file <file>", "source json file for farm adjustments (relative path)")
        .option("-e, --eta <eta>", "Eta (default 8h)", moment_1.default()
        .add(8 * 60, "minutes")
        .unix()
        .toString());
    commander_1.program.parse(process.argv);
    const programOptions = commander_1.program.opts();
    const filePath = path.join(process.cwd(), programOptions.file);
    const plainFile = fs.readFileSync(filePath, "utf-8");
    const farmAdjustments = JSON.parse(plainFile);
    console.log("addr", config_1.config.contractAddresses.MasterChefOperator);
    const operator = (await hardhat_1.ethers.getContractAt("MasterChefOperator", config_1.config.contractAddresses.MasterChefOperator));
    console.log("got contract");
    const farmAdditions = [];
    const farmModifications = [];
    for (let farmAdjustment of farmAdjustments) {
        if (farmAdjustment.type === "add") {
            const { lpToken, allocationPoints, rewarder } = farmAdjustment;
            if (!(lpToken != null && allocationPoints != null)) {
                throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
            }
            farmAdditions.push({
                lpToken,
                allocationPoints,
                rewarder: rewarder !== null && rewarder !== void 0 ? rewarder : hardhat_1.ethers.constants.AddressZero,
            });
        }
        else {
            const { pid, allocationPoints, rewarder } = farmAdjustment;
            if (!(pid != null && allocationPoints != null)) {
                throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
            }
            farmModifications.push({
                pid,
                allocationPoints,
                rewarder: rewarder !== null && rewarder !== void 0 ? rewarder : hardhat_1.ethers.constants.AddressZero,
                overwriteRewarder: !!rewarder,
            });
        }
    }
    if (farmAdditions.length > 0) {
        console.log("staging farm additions, please sign...");
        const stageFarmAdditionsTx = await operator
            .connect(signer)
            .stageFarmAdditions(farmAdditions, programOptions.eta);
        await stageFarmAdditionsTx.wait();
        console.log("done");
    }
    if (farmModifications.length > 0) {
        console.log("staging farm modifications, please sign...");
        const stageFarmModificationsTx = await operator
            .connect(signer)
            .stageFarmModifications(farmModifications, programOptions.eta);
        await stageFarmModificationsTx.wait();
        console.log("done");
    }
}
main().catch((error) => console.error(error));

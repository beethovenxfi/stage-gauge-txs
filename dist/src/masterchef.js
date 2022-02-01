"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeTimelockedAddFarm = exports.encodeTimelockedSetFarm = void 0;
const hardhat_1 = require("hardhat");
const config_1 = require("./config");
async function encodeTimelockedSetFarm(pid, allocationPoints, rewarderAddress, overwriteRewarder, eta, type) {
    const timelockContract = await hardhat_1.ethers.getContractAt("Timelock", config_1.config.contractAddresses.Timelock);
    const timelockFunctionFragment = timelockContract.interface.getFunction(type === "queue" ? "queueTransaction" : "executeTransaction");
    const targetContract = await hardhat_1.ethers.getContractAt("BeethovenxMasterChef", config_1.config.contractAddresses.MasterChef);
    // encode function data with params
    const functionFragment = targetContract.interface.getFunction("set");
    const data = targetContract.interface.encodeFunctionData(functionFragment, [
        pid,
        allocationPoints,
        rewarderAddress,
        overwriteRewarder,
    ]);
    return timelockContract.interface.encodeFunctionData(timelockFunctionFragment, [config_1.config.contractAddresses.MasterChef, 0, "0", data, eta]);
}
exports.encodeTimelockedSetFarm = encodeTimelockedSetFarm;
async function encodeTimelockedAddFarm(tokenAddress, allocationPoints, rewarderAddress = hardhat_1.ethers.constants.AddressZero, eta, type) {
    const timelockContract = await hardhat_1.ethers.getContractAt("Timelock", config_1.config.contractAddresses.Timelock);
    const timelockFunctionFragment = timelockContract.interface.getFunction(type === "queue" ? "queueTransaction" : "executeTransaction");
    const targetContract = await hardhat_1.ethers.getContractAt("BeethovenxMasterChef", config_1.config.contractAddresses.MasterChef);
    const functionFragment = targetContract.interface.getFunction("add");
    const data = targetContract.interface.encodeFunctionData(functionFragment, [
        allocationPoints,
        tokenAddress,
        rewarderAddress,
    ]);
    return timelockContract.interface.encodeFunctionData(timelockFunctionFragment, [config_1.config.contractAddresses.MasterChef, 0, "0", data, eta]);
}
exports.encodeTimelockedAddFarm = encodeTimelockedAddFarm;

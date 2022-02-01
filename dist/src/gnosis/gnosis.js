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
const hardhat_1 = require("hardhat");
const safe_core_sdk_1 = __importStar(require("@gnosis.pm/safe-core-sdk"));
const safe_service_client_1 = __importDefault(require("@gnosis.pm/safe-service-client"));
const config_1 = require("../config");
const path = __importStar(require("path"));
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const masterchef_1 = require("./masterchef");
const moment_1 = __importDefault(require("moment"));
const safeAddress = "0x3Fa5c411857455e0E876412010BE600F4658Dddd";
const provider = new hardhat_1.ethers.providers.JsonRpcProvider("http://127.0.0.1:1248");
const signer = provider.getSigner();
async function main() {
    var _a, _b, _c;
    commander_1.program
        .requiredOption("-f, --file <file>", "source json file for farm adjustments (relative path)")
        .option("-e, --eta <eta>", "Eta (default 8h)", moment_1.default()
        .add(8 * 60, "minutes")
        .unix()
        .toString())
        .addOption(new commander_1.Option("-t, --type <type>", "Timelock transaction type")
        .choices(["queue", "execute"])
        .makeOptionMandatory(true));
    commander_1.program.parse(process.argv);
    const programOptions = commander_1.program.opts();
    const filePath = path.join(process.cwd(), programOptions.file);
    const plainFile = fs.readFileSync(filePath, "utf-8");
    const farmAdjustments = JSON.parse(plainFile);
    const transactions = [];
    console.log(`Preparing transactions to ${programOptions.type} from ${programOptions.file} with eta ${programOptions.eta}`);
    for (const farmAdjustment of farmAdjustments) {
        switch (farmAdjustment.type) {
            case "add": {
                if (!(farmAdjustment.tokenAddress != null &&
                    farmAdjustment.allocationPoints != null)) {
                    throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
                }
                const encodedAddFarmData = await masterchef_1.encodeTimelockedAddFarm(farmAdjustment.tokenAddress, farmAdjustment.allocationPoints, farmAdjustment.rewarderAddress, programOptions.eta, programOptions.type);
                console.log(`Add ${programOptions.type} tx to add farm with token ${farmAdjustment.tokenAddress}, allocationPoints: ${farmAdjustment.allocationPoints}, rewarder: ${(_a = farmAdjustment.rewarderAddress) !== null && _a !== void 0 ? _a : hardhat_1.ethers.constants.AddressZero}`);
                transactions.push({
                    to: config_1.config.contractAddresses.Timelock,
                    data: encodedAddFarmData,
                    value: "0",
                });
                break;
            }
            case "edit": {
                if (!(farmAdjustment.pid != null &&
                    farmAdjustment.allocationPoints != null)) {
                    throw new Error(`Invalid config, missing property ${JSON.stringify(farmAdjustment)}`);
                }
                const encodedEditFarmData = await masterchef_1.encodeTimelockedSetFarm(farmAdjustment.pid, farmAdjustment.allocationPoints, (_b = farmAdjustment.rewarderAddress) !== null && _b !== void 0 ? _b : hardhat_1.ethers.constants.AddressZero, !!farmAdjustment.rewarderAddress, programOptions.eta, programOptions.type);
                console.log(`Add ${programOptions.type} tx to edit farm with pid ${farmAdjustment.pid}, allocationPoints: ${farmAdjustment.allocationPoints}, rewarder: ${(_c = farmAdjustment.rewarderAddress) !== null && _c !== void 0 ? _c : hardhat_1.ethers.constants.AddressZero}, overwrite rewarder: ${!!farmAdjustment.rewarderAddress}`);
                transactions.push({
                    to: config_1.config.contractAddresses.Timelock,
                    data: encodedEditFarmData,
                    value: "0",
                });
                break;
            }
            default:
                throw new Error("Invalid operation type");
        }
    }
    // const token = await ethers.getContractAt(
    //   "BeethovenxToken",
    //   config.contractAddresses.BeethovenxToken
    // );
    // transactions.push({
    //   to: config.contractAddresses.BeethovenxToken,
    //   value: "0",
    //   data: token.interface.encodeFunctionData("transfer", [
    //     "0x3Fa5c411857455e0E876412010BE600F4658Dddd",
    //     10,
    //   ]),
    // });
    const ethAdapter = new safe_core_sdk_1.EthersAdapter({
        ethers: hardhat_1.ethers,
        signer: signer,
    });
    const contractNetworks = {
        [await signer.getChainId()]: {
            multiSendAddress: "0xd1b160Ee570632ac402Efb230d720669604918e8",
            safeMasterCopyAddress: "0x87EB227FE974e9E1d3Bc4Da562e0Bd3C348c2B34",
            safeProxyFactoryAddress: "0xc3C41Ab65Dabe3ae250A0A1FE4706FdB7ECEB951",
        },
    };
    const service = new safe_service_client_1.default("https://safe.fantom.network");
    const safeSdk = await safe_core_sdk_1.default.create({
        ethAdapter: ethAdapter,
        safeAddress,
        contractNetworks,
    });
    console.log(`\n\nCreating transaction on safe ${safeSdk.getAddress()}`);
    const safeTransaction = await safeSdk.createTransaction(transactions);
    await safeSdk.signTransaction(safeTransaction);
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    console.log(`Created transaction with safeTxHash ${safeTxHash}. Proposing...`);
    try {
        await service.proposeTransaction({
            safeAddress,
            safeTransaction,
            safeTxHash,
            senderAddress: await signer.getAddress(),
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    console.log("Transaction ready to sign!");
}
main().catch((error) => console.error(error));

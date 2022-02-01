"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const hardhat_1 = require("hardhat");
const networkConfig = {
    250: {
        contractAddresses: {
            MasterChef: "0x8166994d9ebBe5829EC86Bd81258149B87faCfd3",
            Timelock: "0xb5caee3cd5d86c138f879b3abc5b1bebb63c6471",
            BeethovenxToken: "0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e",
            MasterChefOperator: "",
        },
    },
    4: {
        contractAddresses: {
            MasterChef: "0x51444a9D2E4f0740AD63918CA7F4F6a934cbe147",
            Timelock: "0x8c99AF2B7E880d660c03dBf9F4c81ab32e2E0347",
            BeethovenxToken: "0xF96427079E58eaA5cc334D7213B8280B6Eab8433",
            MasterChefOperator: "0xeC115878129c5F06f270aF426171120c2B703D31",
        },
    },
};
exports.config = networkConfig[hardhat_1.network.config.chainId];

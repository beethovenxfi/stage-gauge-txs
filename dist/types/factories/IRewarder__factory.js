"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRewarder__factory = void 0;
const ethers_1 = require("ethers");
class IRewarder__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IRewarder__factory = IRewarder__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "beetsAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "newLpAmount",
                type: "uint256",
            },
        ],
        name: "onBeetsReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "beetsAmount",
                type: "uint256",
            },
        ],
        name: "pendingTokens",
        outputs: [
            {
                internalType: "contract IERC20[]",
                name: "",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

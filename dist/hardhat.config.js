"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("@nomiclabs/hardhat-ethers");
// const accounts = [`0x${process.env.DEPLOYER!}`];
const config = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {},
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
            chainId: 4,
        },
        fantom: {
            url: "https://rpc.ftm.tools/",
            chainId: 250,
        },
        // "fantom-testnet": {
        //   url: "https://rpc.testnet.fantom.network",
        //   accounts,
        //   chainId: 4002,
        //   live: true,
        //   saveDeployments: true,
        //   tags: ["staging"],
        //   gasMultiplier: 2,
        // },
    },
};
exports.default = config;

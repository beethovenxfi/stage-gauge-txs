"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const networkConfig = {
    fantom: {
        contractAddresses: {
            MasterChefOperator: "",
        },
    },
    rinkeby: {
        contractAddresses: {
            MasterChefOperator: "0xeC115878129c5F06f270aF426171120c2B703D31",
        },
    },
};
const getConfig = (network) => networkConfig[network];
exports.getConfig = getConfig;

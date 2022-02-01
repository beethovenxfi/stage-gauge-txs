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
            MasterChefOperator: "0xF6F17Fa57c2172999BfE6DDF809b6986C4CA33e9",
        },
    },
};
const getConfig = (network) => networkConfig[network];
exports.getConfig = getConfig;

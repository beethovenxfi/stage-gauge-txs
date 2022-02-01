"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timelock__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class Timelock__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(admin_, delay_, overrides) {
        return super.deploy(admin_, delay_, overrides || {});
    }
    getDeployTransaction(admin_, delay_, overrides) {
        return super.getDeployTransaction(admin_, delay_, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Timelock__factory = Timelock__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "admin_",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "delay_",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "txHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "CancelTransaction",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "txHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "ExecuteTransaction",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "NewAdmin",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "newDelay",
                type: "uint256",
            },
        ],
        name: "NewDelay",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newPendingAdmin",
                type: "address",
            },
        ],
        name: "NewPendingAdmin",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "txHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "QueueTransaction",
        type: "event",
    },
    {
        inputs: [],
        name: "GRACE_PERIOD",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAXIMUM_DELAY",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINIMUM_DELAY",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "acceptAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "admin",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "admin_initialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "cancelTransaction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "delay",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "executeTransaction",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "pendingAdmin",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "signature",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "eta",
                type: "uint256",
            },
        ],
        name: "queueTransaction",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "queuedTransactions",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "delay_",
                type: "uint256",
            },
        ],
        name: "setDelay",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "pendingAdmin_",
                type: "address",
            },
        ],
        name: "setPendingAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5060405161119b38038061119b83398101604081905261002f91610134565b61012c81101561009a5760405162461bcd60e51b8152602060048201526037602482015260008051602061117b83398151915260448201527f7420657863656564206d696e696d756d2064656c61792e00000000000000000060648201526084015b60405180910390fd5b62278d008111156101015760405162461bcd60e51b815260206004820152603b602482015260008051602061117b83398151915260448201527f74206e6f7420657863656564206d6178696d756d2064656c61792e00000000006064820152608401610091565b600080546001600160a01b0319166001600160a01b0393909316929092179091556002556003805460ff1916905561016e565b6000806040838503121561014757600080fd5b82516001600160a01b038116811461015e57600080fd5b6020939093015192949293505050565b610ffe8061017d6000396000f3fe6080604052600436106100e15760003560e01c80636fc1f57e1161007f578063c1a287e211610059578063c1a287e214610240578063e177246e14610257578063f2b0653714610277578063f851a440146102a757600080fd5b80636fc1f57e146101e95780637d645fab14610213578063b1b43ae51461022a57600080fd5b80633a66f901116100bb5780633a66f901146101655780634dd18bf514610193578063591fcdfe146101b35780636a42b8f8146101d357600080fd5b80630825f38f146100ed5780630e18b68114610116578063267822471461012d57600080fd5b366100e857005b600080fd5b6101006100fb366004610d5d565b6102c7565b60405161010d9190610eec565b60405180910390f35b34801561012257600080fd5b5061012b610638565b005b34801561013957600080fd5b5060015461014d906001600160a01b031681565b6040516001600160a01b03909116815260200161010d565b34801561017157600080fd5b50610185610180366004610d5d565b610701565b60405190815260200161010d565b34801561019f57600080fd5b5061012b6101ae366004610d3b565b6108ae565b3480156101bf57600080fd5b5061012b6101ce366004610d5d565b610a0b565b3480156101df57600080fd5b5061018560025481565b3480156101f557600080fd5b506003546102039060ff1681565b604051901515815260200161010d565b34801561021f57600080fd5b5061018562278d0081565b34801561023657600080fd5b5061018561012c81565b34801561024c57600080fd5b506101856212750081565b34801561026357600080fd5b5061012b610272366004610e0e565b610b25565b34801561028357600080fd5b50610203610292366004610e0e565b60046020526000908152604090205460ff1681565b3480156102b357600080fd5b5060005461014d906001600160a01b031681565b6000546060906001600160a01b0316331461034f5760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20436160448201527f6c6c206d75737420636f6d652066726f6d2061646d696e2e000000000000000060648201526084015b60405180910390fd5b6000868686868660405160200161036a959493929190610ea0565b60408051601f1981840301815291815281516020928301206000818152600490935291205490915060ff166103f55760405162461bcd60e51b815260206004820152603d6024820152600080516020610fa983398151915260448201527f616e73616374696f6e206861736e2774206265656e207175657565642e0000006064820152608401610346565b824210156104675760405162461bcd60e51b81526020600482015260456024820152600080516020610fa983398151915260448201527f616e73616374696f6e206861736e2774207375727061737365642074696d65206064820152643637b1b59760d91b608482015260a401610346565b6104746212750084610f3c565b4211156104cd5760405162461bcd60e51b81526020600482015260336024820152600080516020610fa983398151915260448201527230b739b0b1ba34b7b71034b99039ba30b6329760691b6064820152608401610346565b6000818152600460205260409020805460ff1916905584516060906104f357508361051f565b85805190602001208560405160200161050d929190610e53565b60405160208183030381529060405290505b600080896001600160a01b0316898460405161053b9190610e84565b60006040518083038185875af1925050503d8060008114610578576040519150601f19603f3d011682016040523d82523d6000602084013e61057d565b606091505b5091509150816105e35760405162461bcd60e51b815260206004820152603d6024820152600080516020610fa983398151915260448201527f616e73616374696f6e20657865637574696f6e2072657665727465642e0000006064820152608401610346565b896001600160a01b0316847fa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e78b8b8b8b6040516106239493929190610eff565b60405180910390a39998505050505050505050565b6001546001600160a01b031633146106b85760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a61636365707441646d696e3a2043616c6c206d75737460448201527f20636f6d652066726f6d2070656e64696e6741646d696e2e00000000000000006064820152608401610346565b60008054336001600160a01b0319918216811783556001805490921690915560405190917f71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c91a2565b600080546001600160a01b0316331461077b5760405162461bcd60e51b815260206004820152603660248201527f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a2043616c6c6044820152751036bab9ba1031b7b6b290333937b69030b236b4b71760511b6064820152608401610346565b6002546107889042610f3c565b82101561080f5760405162461bcd60e51b815260206004820152604960248201527f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a204573746960448201527f6d6174656420657865637574696f6e20626c6f636b206d757374207361746973606482015268333c903232b630bc9760b91b608482015260a401610346565b6000868686868660405160200161082a959493929190610ea0565b60408051601f19818403018152828252805160209182012060008181526004909252919020805460ff1916600117905591506001600160a01b0388169082907f76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f9061089c908a908a908a908a90610eff565b60405180910390a39695505050505050565b60035460ff16156109335733301461092e5760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a73657450656e64696e6741646d696e3a2043616c6c2060448201527f6d75737420636f6d652066726f6d2054696d656c6f636b2e00000000000000006064820152608401610346565b6109c1565b6000546001600160a01b031633146109b35760405162461bcd60e51b815260206004820152603b60248201527f54696d656c6f636b3a3a73657450656e64696e6741646d696e3a20466972737460448201527f2063616c6c206d75737420636f6d652066726f6d2061646d696e2e00000000006064820152608401610346565b6003805460ff191660011790555b600180546001600160a01b0319166001600160a01b0383169081179091556040517f69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a75690600090a250565b6000546001600160a01b03163314610a8b5760405162461bcd60e51b815260206004820152603760248201527f54696d656c6f636b3a3a63616e63656c5472616e73616374696f6e3a2043616c60448201527f6c206d75737420636f6d652066726f6d2061646d696e2e0000000000000000006064820152608401610346565b60008585858585604051602001610aa6959493929190610ea0565b60408051601f19818403018152828252805160209182012060008181526004909252919020805460ff1916905591506001600160a01b0387169082907f2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf8790610b15908990899089908990610eff565b60405180910390a3505050505050565b333014610b8e5760405162461bcd60e51b815260206004820152603160248201527f54696d656c6f636b3a3a73657444656c61793a2043616c6c206d75737420636f60448201527036b290333937b6902a34b6b2b637b1b59760791b6064820152608401610346565b61012c811015610bfd5760405162461bcd60e51b815260206004820152603460248201527f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d75737420656044820152733c31b2b2b21036b4b734b6bab6903232b630bc9760611b6064820152608401610346565b62278d00811115610c765760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206e60448201527f6f7420657863656564206d6178696d756d2064656c61792e00000000000000006064820152608401610346565b600281905560405181907f948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c90600090a250565b600067ffffffffffffffff80841115610cc457610cc4610f92565b604051601f8501601f19908116603f01168101908282118183101715610cec57610cec610f92565b81604052809350858152868686011115610d0557600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b0381168114610d3657600080fd5b919050565b600060208284031215610d4d57600080fd5b610d5682610d1f565b9392505050565b600080600080600060a08688031215610d7557600080fd5b610d7e86610d1f565b945060208601359350604086013567ffffffffffffffff80821115610da257600080fd5b818801915088601f830112610db657600080fd5b610dc589833560208501610ca9565b94506060880135915080821115610ddb57600080fd5b508601601f81018813610ded57600080fd5b610dfc88823560208401610ca9565b95989497509295608001359392505050565b600060208284031215610e2057600080fd5b5035919050565b60008151808452610e3f816020860160208601610f62565b601f01601f19169290920160200192915050565b6001600160e01b0319831681528151600090610e76816004850160208701610f62565b919091016004019392505050565b60008251610e96818460208701610f62565b9190910192915050565b60018060a01b038616815284602082015260a060408201526000610ec760a0830186610e27565b8281036060840152610ed98186610e27565b9150508260808301529695505050505050565b602081526000610d566020830184610e27565b848152608060208201526000610f186080830186610e27565b8281036040840152610f2a8186610e27565b91505082606083015295945050505050565b60008219821115610f5d57634e487b7160e01b600052601160045260246000fd5b500190565b60005b83811015610f7d578181015183820152602001610f65565b83811115610f8c576000848401525b50505050565b634e487b7160e01b600052604160045260246000fdfe54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a205472a2646970667358221220458810cf1903b8573d2feb422f4e65f2beaa75bc226117b8e5eca74157fcff3664736f6c6343000807003354696d656c6f636b3a3a636f6e7374727563746f723a2044656c6179206d7573";
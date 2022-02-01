/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FreshBeets } from "../FreshBeets";

export class FreshBeets__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_vestingToken: string, overrides?: Overrides): Promise<FreshBeets> {
    return super.deploy(_vestingToken, overrides || {}) as Promise<FreshBeets>;
  }
  getDeployTransaction(
    _vestingToken: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_vestingToken, overrides || {});
  }
  attach(address: string): FreshBeets {
    return super.attach(address) as FreshBeets;
  }
  connect(signer: Signer): FreshBeets__factory {
    return super.connect(signer) as FreshBeets__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FreshBeets {
    return new Contract(address, _abi, signerOrProvider) as FreshBeets;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_vestingToken",
        type: "address",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BurnFreshBeets",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Enter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Leave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MintFreshBeets",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ShareRevenue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "enter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shareOfFreshBeets",
        type: "uint256",
      },
    ],
    name: "leave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "shareRevenue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620012653803806200126583398101604081905262000034916200016a565b604080518082018252600a8152694672657368426565747360b01b60208083019182528351808501909452600684526566424545545360d01b9084015281519192916200008491600391620000c4565b5080516200009a906004906020840190620000c4565b5050600580546001600160a01b0319166001600160a01b03939093169290921790915550620001d9565b828054620000d2906200019c565b90600052602060002090601f016020900481019282620000f6576000855562000141565b82601f106200011157805160ff191683800117855562000141565b8280016001018555821562000141579182015b828111156200014157825182559160200191906001019062000124565b506200014f92915062000153565b5090565b5b808211156200014f576000815560010162000154565b6000602082840312156200017d57600080fd5b81516001600160a01b03811681146200019557600080fd5b9392505050565b600181811c90821680620001b157607f821691505b60208210811415620001d357634e487b7160e01b600052602260045260246000fd5b50919050565b61107c80620001e96000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80633950935111610097578063a457c2d711610066578063a457c2d714610206578063a59f3e0c14610219578063a9059cbb1461022c578063dd62ed3e1461023f57600080fd5b806339509351146101af57806367dfd4c9146101c257806370a08231146101d557806395d89b41146101fe57600080fd5b806318160ddd116100d357806318160ddd1461015057806319d152fa1461016257806323b872dd1461018d578063313ce567146101a057600080fd5b806306fdde03146100fa578063095ea7b314610118578063139e41e41461013b575b600080fd5b610102610278565b60405161010f9190610f30565b60405180910390f35b61012b610126366004610eb2565b61030a565b604051901515815260200161010f565b61014e610149366004610efe565b610320565b005b6002545b60405190815260200161010f565b600554610175906001600160a01b031681565b6040516001600160a01b03909116815260200161010f565b61012b61019b366004610e76565b6103e1565b6040516012815260200161010f565b61012b6101bd366004610eb2565b610490565b61014e6101d0366004610efe565b6104cc565b6101546101e3366004610e21565b6001600160a01b031660009081526020819052604090205490565b610102610677565b61012b610214366004610eb2565b610686565b61014e610227366004610efe565b61071f565b61012b61023a366004610eb2565b6108df565b61015461024d366004610e43565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461028790610ff5565b80601f01602080910402602001604051908101604052809291908181526020018280546102b390610ff5565b80156103005780601f106102d557610100808354040283529160200191610300565b820191906000526020600020905b8154815290600101906020018083116102e357829003601f168201915b5050505050905090565b60006103173384846108ec565b50600192915050565b6005546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401602060405180830381600087803b15801561037257600080fd5b505af1158015610386573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103aa9190610edc565b506040518181527f8345132cbbbde83001e783cdfdd5190dedc863ae82cae7abe302b22322a602749060200160405180910390a150565b60006103ee848484610a11565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156104785760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61048585338584036108ec565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916103179185906104c7908690610f85565b6108ec565b8015610674576005546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b15801561051657600080fd5b505afa15801561052a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054e9190610f17565b9050600061055b60025490565b905060008161056a8486610fbf565b6105749190610f9d565b90506105803385610be0565b60055460405163a9059cbb60e01b8152336004820152602481018390526001600160a01b039091169063a9059cbb90604401602060405180830381600087803b1580156105cc57600080fd5b505af11580156105e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106049190610edc565b5060405181815233907f61a26f7c17d8780c095ccfa67e689a13ee4e06ddce3da18956369f4a396100e89060200160405180910390a260405184815233907f16a54d178883530c2a0d732a0592cdf8d16934c3e96f76cced1b97acbebf740a906020015b60405180910390a25050505b50565b60606004805461028790610ff5565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156107085760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161046f565b61071533858584036108ec565b5060019392505050565b8015610674576005546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b15801561076957600080fd5b505afa15801561077d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a19190610f17565b905060006107ae60025490565b6005546040516323b872dd60e01b8152336004820152306024820152604481018690529192506001600160a01b0316906323b872dd90606401602060405180830381600087803b15801561080157600080fd5b505af1158015610815573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108399190610edc565b506000811580610847575082155b1561085357508261086e565b6000836108608487610fbf565b61086a9190610f9d565b9150505b6108783382610d26565b60405184815233907f1fb48929215fc354244acea33112720ce5b7ba6912db70bb0149e77aa7c91ce19060200160405180910390a260405181815233907f1d4b7f3c8ecddd4f44ee05cffc07dc548cd25f9a133a615626f5645b3aa2520390602001610668565b6000610317338484610a11565b6001600160a01b03831661094e5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161046f565b6001600160a01b0382166109af5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161046f565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316610a755760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161046f565b6001600160a01b038216610ad75760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161046f565b6001600160a01b03831660009081526020819052604090205481811015610b4f5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161046f565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610b86908490610f85565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bd291815260200190565b60405180910390a350505050565b6001600160a01b038216610c405760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161046f565b6001600160a01b03821660009081526020819052604090205481811015610cb45760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161046f565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610ce3908490610fde565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610a04565b6001600160a01b038216610d7c5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161046f565b8060026000828254610d8e9190610f85565b90915550506001600160a01b03821660009081526020819052604081208054839290610dbb908490610f85565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b80356001600160a01b0381168114610e1c57600080fd5b919050565b600060208284031215610e3357600080fd5b610e3c82610e05565b9392505050565b60008060408385031215610e5657600080fd5b610e5f83610e05565b9150610e6d60208401610e05565b90509250929050565b600080600060608486031215610e8b57600080fd5b610e9484610e05565b9250610ea260208501610e05565b9150604084013590509250925092565b60008060408385031215610ec557600080fd5b610ece83610e05565b946020939093013593505050565b600060208284031215610eee57600080fd5b81518015158114610e3c57600080fd5b600060208284031215610f1057600080fd5b5035919050565b600060208284031215610f2957600080fd5b5051919050565b600060208083528351808285015260005b81811015610f5d57858101830151858201604001528201610f41565b81811115610f6f576000604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610f9857610f98611030565b500190565b600082610fba57634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615610fd957610fd9611030565b500290565b600082821015610ff057610ff0611030565b500390565b600181811c9082168061100957607f821691505b6020821081141561102a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea264697066735822122097ff27e9957ee61ee54df359b9576d331fd6239e23d3337473e257d5dae2ed0a64736f6c63430008070033";

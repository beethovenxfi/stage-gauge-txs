/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Reentrance } from "../Reentrance";

export class Reentrance__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_victim: string, overrides?: Overrides): Promise<Reentrance> {
    return super.deploy(_victim, overrides || {}) as Promise<Reentrance>;
  }
  getDeployTransaction(
    _victim: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_victim, overrides || {});
  }
  attach(address: string): Reentrance {
    return super.attach(address) as Reentrance;
  }
  connect(signer: Signer): Reentrance__factory {
    return super.connect(signer) as Reentrance__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Reentrance {
    return new Contract(address, _abi, signerOrProvider) as Reentrance;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract Victim",
        name: "_victim",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516102d63803806102d683398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610243806100936000396000f3fe6080604052600436106100225760003560e01c80633ccfd60b146100d9576100b0565b366100b05761004f604051806040016040528060078152602001667265636569766560c81b8152506100f0565b6000546040516351cff8d960e01b81523060048201819052916001600160a01b0316906351cff8d990602401600060405180830381600087803b15801561009557600080fd5b505af11580156100a9573d6000803e3d6000fd5b5050505050005b61004f6040518060400160405280600881526020016766616c6c6261636b60c01b8152506100f0565b3480156100e557600080fd5b506100ee610136565b005b6101338160405160240161010491906101b8565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610197565b50565b6000546040516351cff8d960e01b81523060048201819052916001600160a01b0316906351cff8d990602401600060405180830381600087803b15801561017c57600080fd5b505af1158015610190573d6000803e3d6000fd5b5050505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b600060208083528351808285015260005b818110156101e5578581018301518582016040015282016101c9565b818111156101f7576000604083870101525b50601f01601f191692909201604001939250505056fea2646970667358221220182826a8a175380e04bdbb5bc4772ab66e0ebe3c2a837764a47650c9199ed52b64736f6c63430008070033";

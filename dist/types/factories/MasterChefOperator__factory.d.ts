import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MasterChefOperator } from "../MasterChefOperator";
export declare class MasterChefOperator__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_timelock: string, _masterChef: string, admin: string, stagingAdmin: string, overrides?: Overrides): Promise<MasterChefOperator>;
    getDeployTransaction(_timelock: string, _masterChef: string, admin: string, stagingAdmin: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): MasterChefOperator;
    connect(signer: Signer): MasterChefOperator__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MasterChefOperator;
}

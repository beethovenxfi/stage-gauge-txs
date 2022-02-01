import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestToken } from "../TestToken";
export declare class TestToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(someAddr: string, value: BigNumberish, mchef: string, overrides?: Overrides): Promise<TestToken>;
    getDeployTransaction(someAddr: string, value: BigNumberish, mchef: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): TestToken;
    connect(signer: Signer): TestToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestToken;
}

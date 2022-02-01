import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { FreshBeets } from "../FreshBeets";
export declare class FreshBeets__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_vestingToken: string, overrides?: Overrides): Promise<FreshBeets>;
    getDeployTransaction(_vestingToken: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): FreshBeets;
    connect(signer: Signer): FreshBeets__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FreshBeets;
}

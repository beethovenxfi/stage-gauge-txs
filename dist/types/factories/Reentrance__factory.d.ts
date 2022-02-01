import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Reentrance } from "../Reentrance";
export declare class Reentrance__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_victim: string, overrides?: Overrides): Promise<Reentrance>;
    getDeployTransaction(_victim: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Reentrance;
    connect(signer: Signer): Reentrance__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Reentrance;
}

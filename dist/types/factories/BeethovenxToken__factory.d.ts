import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { BeethovenxToken } from "../BeethovenxToken";
export declare class BeethovenxToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<BeethovenxToken>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): BeethovenxToken;
    connect(signer: Signer): BeethovenxToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): BeethovenxToken;
}

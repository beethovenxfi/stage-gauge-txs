import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { BeetsBar } from "../BeetsBar";
export declare class BeetsBar__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_vestingToken: string, overrides?: Overrides): Promise<BeetsBar>;
    getDeployTransaction(_vestingToken: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): BeetsBar;
    connect(signer: Signer): BeetsBar__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): BeetsBar;
}

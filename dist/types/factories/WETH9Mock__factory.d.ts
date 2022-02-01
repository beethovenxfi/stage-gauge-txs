import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { WETH9Mock } from "../WETH9Mock";
export declare class WETH9Mock__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<WETH9Mock>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): WETH9Mock;
    connect(signer: Signer): WETH9Mock__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): WETH9Mock;
}

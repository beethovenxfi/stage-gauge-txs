import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { BeethovenxOrchestra } from "../BeethovenxOrchestra";
export declare class BeethovenxOrchestra__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_fidelioDuettoBPT: string, overrides?: Overrides): Promise<BeethovenxOrchestra>;
    getDeployTransaction(_fidelioDuettoBPT: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): BeethovenxOrchestra;
    connect(signer: Signer): BeethovenxOrchestra__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): BeethovenxOrchestra;
}

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Victim } from "../Victim";
export declare class Victim__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(token: string, overrides?: Overrides): Promise<Victim>;
    getDeployTransaction(token: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Victim;
    connect(signer: Signer): Victim__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Victim;
}

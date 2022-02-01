import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { BeethovenxOhmEmissionToken } from "../BeethovenxOhmEmissionToken";
export declare class BeethovenxOhmEmissionToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_tokenHolderAddress: string, overrides?: Overrides): Promise<BeethovenxOhmEmissionToken>;
    getDeployTransaction(_tokenHolderAddress: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): BeethovenxOhmEmissionToken;
    connect(signer: Signer): BeethovenxOhmEmissionToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): BeethovenxOhmEmissionToken;
}

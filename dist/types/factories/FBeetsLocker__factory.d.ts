import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { FBeetsLocker } from "../FBeetsLocker";
export declare class FBeetsLocker__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lockingToken: string, _epochDuration: BigNumberish, _lockDuration: BigNumberish, overrides?: Overrides): Promise<FBeetsLocker>;
    getDeployTransaction(_lockingToken: string, _epochDuration: BigNumberish, _lockDuration: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): FBeetsLocker;
    connect(signer: Signer): FBeetsLocker__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): FBeetsLocker;
}

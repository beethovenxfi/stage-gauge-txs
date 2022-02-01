import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MasterChef } from "../MasterChef";
export declare class MasterChef__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_beets: string, _treasuryAddress: string, _beetsPerBlock: BigNumberish, _startBlock: BigNumberish, overrides?: Overrides): Promise<MasterChef>;
    getDeployTransaction(_beets: string, _treasuryAddress: string, _beetsPerBlock: BigNumberish, _startBlock: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): MasterChef;
    connect(signer: Signer): MasterChef__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MasterChef;
}

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { BeethovenxMasterChef } from "../BeethovenxMasterChef";
export declare class BeethovenxMasterChef__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_beets: string, _treasuryAddress: string, _beetsPerBlock: BigNumberish, _startBlock: BigNumberish, overrides?: Overrides): Promise<BeethovenxMasterChef>;
    getDeployTransaction(_beets: string, _treasuryAddress: string, _beetsPerBlock: BigNumberish, _startBlock: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): BeethovenxMasterChef;
    connect(signer: Signer): BeethovenxMasterChef__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): BeethovenxMasterChef;
}

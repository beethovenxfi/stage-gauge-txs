import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MasterChefLpTokenTimelock } from "../MasterChefLpTokenTimelock";
export declare class MasterChefLpTokenTimelock__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(token_: string, beneficiary_: string, releaseTime_: BigNumberish, masterChef_: string, masterChefPoolId_: BigNumberish, overrides?: Overrides): Promise<MasterChefLpTokenTimelock>;
    getDeployTransaction(token_: string, beneficiary_: string, releaseTime_: BigNumberish, masterChef_: string, masterChefPoolId_: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): MasterChefLpTokenTimelock;
    connect(signer: Signer): MasterChefLpTokenTimelock__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MasterChefLpTokenTimelock;
}

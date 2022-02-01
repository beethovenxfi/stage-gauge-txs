import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TimeBasedMasterChefRewarder } from "../TimeBasedMasterChefRewarder";
export declare class TimeBasedMasterChefRewarder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): Promise<TimeBasedMasterChefRewarder>;
    getDeployTransaction(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): TimeBasedMasterChefRewarder;
    connect(signer: Signer): TimeBasedMasterChefRewarder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TimeBasedMasterChefRewarder;
}

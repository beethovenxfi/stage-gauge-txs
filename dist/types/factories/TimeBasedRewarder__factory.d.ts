import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TimeBasedRewarder } from "../TimeBasedRewarder";
export declare class TimeBasedRewarder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): Promise<TimeBasedRewarder>;
    getDeployTransaction(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): TimeBasedRewarder;
    connect(signer: Signer): TimeBasedRewarder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TimeBasedRewarder;
}

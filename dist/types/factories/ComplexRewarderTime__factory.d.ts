import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ComplexRewarderTime } from "../ComplexRewarderTime";
export declare class ComplexRewarderTime__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): Promise<ComplexRewarderTime>;
    getDeployTransaction(_rewardToken: string, _rewardPerSecond: BigNumberish, _MASTERCHEF: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ComplexRewarderTime;
    connect(signer: Signer): ComplexRewarderTime__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ComplexRewarderTime;
}

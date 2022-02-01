import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { RewarderMock } from "../RewarderMock";
export declare class RewarderMock__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_rewardMultiplier: BigNumberish, _rewardToken: string, _BEETHOVEN_MASTERCHEF: string, overrides?: Overrides): Promise<RewarderMock>;
    getDeployTransaction(_rewardMultiplier: BigNumberish, _rewardToken: string, _BEETHOVEN_MASTERCHEF: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): RewarderMock;
    connect(signer: Signer): RewarderMock__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): RewarderMock;
}

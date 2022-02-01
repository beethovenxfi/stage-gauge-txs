import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { RewarderBrokenMock } from "../RewarderBrokenMock";
export declare class RewarderBrokenMock__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<RewarderBrokenMock>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): RewarderBrokenMock;
    connect(signer: Signer): RewarderBrokenMock__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): RewarderBrokenMock;
}

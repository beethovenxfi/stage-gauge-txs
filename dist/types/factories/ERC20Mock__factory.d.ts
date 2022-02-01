import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ERC20Mock } from "../ERC20Mock";
export declare class ERC20Mock__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(name: string, symbol: string, supply: BigNumberish, overrides?: Overrides): Promise<ERC20Mock>;
    getDeployTransaction(name: string, symbol: string, supply: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): ERC20Mock;
    connect(signer: Signer): ERC20Mock__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Mock;
}

import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRewarder } from "../IRewarder";
export declare class IRewarder__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IRewarder;
}

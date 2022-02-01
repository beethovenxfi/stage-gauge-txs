import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMiniChefV2 } from "../IMiniChefV2";
export declare class IMiniChefV2__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): IMiniChefV2;
}

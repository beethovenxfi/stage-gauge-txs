import { BigNumberish } from "ethers";
export declare function encodeTimelockedSetFarm(pid: string, allocationPoints: BigNumberish, rewarderAddress: string, overwriteRewarder: boolean, eta: number, type: "queue" | "execute"): Promise<string>;
export declare function encodeTimelockedAddFarm(tokenAddress: string, allocationPoints: BigNumberish, rewarderAddress: string | undefined, eta: number, type: "queue" | "execute"): Promise<string>;

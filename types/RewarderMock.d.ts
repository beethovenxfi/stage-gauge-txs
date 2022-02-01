/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface RewarderMockInterface extends ethers.utils.Interface {
  functions: {
    "onBeetsReward(uint256,address,address,uint256,uint256)": FunctionFragment;
    "pendingTokens(uint256,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "onBeetsReward",
    values: [BigNumberish, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingTokens",
    values: [BigNumberish, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "onBeetsReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingTokens",
    data: BytesLike
  ): Result;

  events: {};
}

export class RewarderMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: RewarderMockInterface;

  functions: {
    onBeetsReward(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "onBeetsReward(uint256,address,address,uint256,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    pendingTokens(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        rewardTokens: string[];
        rewardAmounts: BigNumber[];
      }
    >;

    "pendingTokens(uint256,address,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        rewardTokens: string[];
        rewardAmounts: BigNumber[];
      }
    >;
  };

  onBeetsReward(
    arg0: BigNumberish,
    arg1: string,
    to: string,
    beetsAmount: BigNumberish,
    arg4: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "onBeetsReward(uint256,address,address,uint256,uint256)"(
    arg0: BigNumberish,
    arg1: string,
    to: string,
    beetsAmount: BigNumberish,
    arg4: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  pendingTokens(
    arg0: BigNumberish,
    arg1: string,
    beetsAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[]] & {
      rewardTokens: string[];
      rewardAmounts: BigNumber[];
    }
  >;

  "pendingTokens(uint256,address,uint256)"(
    arg0: BigNumberish,
    arg1: string,
    beetsAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[]] & {
      rewardTokens: string[];
      rewardAmounts: BigNumber[];
    }
  >;

  callStatic: {
    onBeetsReward(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "onBeetsReward(uint256,address,address,uint256,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pendingTokens(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        rewardTokens: string[];
        rewardAmounts: BigNumber[];
      }
    >;

    "pendingTokens(uint256,address,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        rewardTokens: string[];
        rewardAmounts: BigNumber[];
      }
    >;
  };

  filters: {};

  estimateGas: {
    onBeetsReward(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "onBeetsReward(uint256,address,address,uint256,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    pendingTokens(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingTokens(uint256,address,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    onBeetsReward(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "onBeetsReward(uint256,address,address,uint256,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      to: string,
      beetsAmount: BigNumberish,
      arg4: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    pendingTokens(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingTokens(uint256,address,uint256)"(
      arg0: BigNumberish,
      arg1: string,
      beetsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

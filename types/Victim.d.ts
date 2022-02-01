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

interface VictimInterface extends ethers.utils.Interface {
  functions: {
    "rewardToken()": FunctionFragment;
    "withdraw(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "rewardToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "rewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class Victim extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: VictimInterface;

  functions: {
    rewardToken(overrides?: CallOverrides): Promise<[string]>;

    "rewardToken()"(overrides?: CallOverrides): Promise<[string]>;

    withdraw(to: string, overrides?: Overrides): Promise<ContractTransaction>;

    "withdraw(address)"(
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  rewardToken(overrides?: CallOverrides): Promise<string>;

  "rewardToken()"(overrides?: CallOverrides): Promise<string>;

  withdraw(to: string, overrides?: Overrides): Promise<ContractTransaction>;

  "withdraw(address)"(
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    rewardToken(overrides?: CallOverrides): Promise<string>;

    "rewardToken()"(overrides?: CallOverrides): Promise<string>;

    withdraw(to: string, overrides?: CallOverrides): Promise<void>;

    "withdraw(address)"(to: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    rewardToken(overrides?: CallOverrides): Promise<BigNumber>;

    "rewardToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(to: string, overrides?: Overrides): Promise<BigNumber>;

    "withdraw(address)"(to: string, overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    rewardToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "rewardToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(to: string, overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdraw(address)"(
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
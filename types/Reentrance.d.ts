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

interface ReentranceInterface extends ethers.utils.Interface {
  functions: {
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class Reentrance extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ReentranceInterface;

  functions: {
    withdraw(overrides?: Overrides): Promise<ContractTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  withdraw(overrides?: Overrides): Promise<ContractTransaction>;

  "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    withdraw(overrides?: CallOverrides): Promise<void>;

    "withdraw()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    withdraw(overrides?: Overrides): Promise<BigNumber>;

    "withdraw()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    withdraw(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}

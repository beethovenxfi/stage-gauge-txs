const networkConfig: Record<
  string,
  {
    contractAddresses: {
      MasterChefOperator: string;
    };
  }
> = {
  fantom: {
    contractAddresses: {
      MasterChefOperator: "",
    },
  },
  rinkeby: {
    contractAddresses: {
      MasterChefOperator: "0x05C363a6BFd0B294Fe09487339c16E08E25CC500",
    },
  },
};

export const getConfig = (network: string) => networkConfig[network];

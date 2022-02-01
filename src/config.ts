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
      MasterChefOperator: "0xeC115878129c5F06f270aF426171120c2B703D31",
    },
  },
};

export const getConfig = (network: string) => networkConfig[network];

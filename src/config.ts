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
      MasterChefOperator: "0x24Dce9214bA5B93B4ee7F1A7A00c9BeB1c8F709C",
    },
  },
  rinkeby: {
    contractAddresses: {
      MasterChefOperator: "0xF6F17Fa57c2172999BfE6DDF809b6986C4CA33e9",
    },
  },
};

export const getConfig = (network: string) => networkConfig[network];

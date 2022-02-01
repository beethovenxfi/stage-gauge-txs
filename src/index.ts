#! /usr/bin/env node

import * as path from "path";
import { program } from "commander";
import * as fs from "fs";
import moment from "moment";
import { BigNumberish, ethers } from "ethers";
import { getConfig } from "./config";
import masterChefOperatorAbi from "../abi/MasterChefOperator.json";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:1248");
const signer = provider.getSigner();

type FarmAdd = {
  type: "add";
  lpToken?: string;
  allocationPoints?: number;
  rewarder?: string;
};
type FarmEdit = {
  type: "edit";
  pid?: string;
  allocationPoints?: number;
  rewarder?: string;
};
type FarmAdjustment = FarmAdd | FarmEdit;

async function main() {
  program
    .requiredOption(
      "-f, --file <file>",
      "source json file for farm adjustments (relative path)"
    )
    .option("-n, --network <network>", "Network", "fantom")
    .option(
      "-e, --eta <eta>",
      "Eta (default 8h)",
      moment()
        .add(8 * 60, "minutes")
        .unix()
        .toString()
    );

  program.parse(process.argv);

  const programOptions = program.opts();
  const config = getConfig(programOptions.network);
  const filePath = path.join(process.cwd(), programOptions.file);
  const plainFile = fs.readFileSync(filePath, "utf-8");
  const farmAdjustments: FarmAdjustment[] = JSON.parse(plainFile);

  console.log("addr", config.contractAddresses.MasterChefOperator);

  const operator = new ethers.Contract(
    config.contractAddresses.MasterChefOperator,
    masterChefOperatorAbi,
    signer
  );
  console.log("got contract");

  const farmAdditions: Array<{
    lpToken: string;
    allocationPoints: BigNumberish;
    rewarder: string;
  }> = [];
  const farmModifications: Array<{
    pid: BigNumberish;
    allocationPoints: BigNumberish;
    rewarder: string;
    overwriteRewarder: boolean;
  }> = [];

  for (let farmAdjustment of farmAdjustments) {
    if (farmAdjustment.type === "add") {
      const { lpToken, allocationPoints, rewarder } = farmAdjustment;
      if (!(lpToken != null && allocationPoints != null)) {
        throw new Error(
          `Invalid config, missing property ${JSON.stringify(farmAdjustment)}`
        );
      }
      farmAdditions.push({
        lpToken,
        allocationPoints,
        rewarder: rewarder ?? ethers.constants.AddressZero,
      });
    } else {
      const { pid, allocationPoints, rewarder } = farmAdjustment;
      if (!(pid != null && allocationPoints != null)) {
        throw new Error(
          `Invalid config, missing property ${JSON.stringify(farmAdjustment)}`
        );
      }
      farmModifications.push({
        pid,
        allocationPoints,
        rewarder: rewarder ?? ethers.constants.AddressZero,
        overwriteRewarder: !!rewarder,
      });
    }
  }

  if (farmAdditions.length > 0) {
    console.log("staging farm additions, please sign...");
    const stageFarmAdditionsTx = await operator.stageFarmAdditions(
      farmAdditions,
      programOptions.eta
    );
    await stageFarmAdditionsTx.wait();
    console.log("done");
  }
  if (farmModifications.length > 0) {
    console.log("staging farm modifications, please sign...");
    const stageFarmModificationsTx = await operator.stageFarmModifications(
      farmModifications,
      programOptions.eta
    );
    await stageFarmModificationsTx.wait();
    console.log("done");
  }
}

main().catch((error) => console.error(error));

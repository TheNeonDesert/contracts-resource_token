// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ResourceTokenFactory = await ethers.getContractFactory(
    "ResourceTokenFactory"
  );
  const factory = await ResourceTokenFactory.deploy();
  await factory.deployed();

  console.log("ResourceTokenFactory deployed to:", factory.address);

  const tokensToCreate = [
    { name: "Stone", symbol: "STONE" },
    { name: "Stick", symbol: "STICK" },
    { name: "Plant Fiber", symbol: "PLANT" },
    { name: "Apple", symbol: "APPLE" },
  ];
  for (let i = 0; i < tokensToCreate.length; i++) {
    const tx = await factory.createResourceToken(
      tokensToCreate[i].name,
      tokensToCreate[i].symbol
    );
    const rc = await tx.wait(); // 0ms, as tx is already confirmed
    if (rc.events) {
      const event = rc.events.find((event) => event.event === "TokenCreated");
      if (event) {
        console.log(tokensToCreate[i].name, event.args);
      }
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

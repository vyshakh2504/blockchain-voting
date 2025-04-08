const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(); // Deploy the contract

  await voting.waitForDeployment(); // ✅ Use waitForDeployment in newer ethers versions

  console.log("✅ Voting contract deployed to:", voting.target); // Use voting.target instead of voting.address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

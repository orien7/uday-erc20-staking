// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // 1. Deploy Token
  const Token = await ethers.getContractFactory("UDAYToken");
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();
  console.log("UDAYToken deployed to:", await token.getAddress());

  // 2. Deploy Staking (10% APY, 7 day lock)
  const Staking = await ethers.getContractFactory("StakingRewards");
  const staking = await Staking.deploy(
    await token.getAddress(),
    deployer.address,
    1000,  // 10% APY in BPS
    7      // 7 day lock period
  );
  await staking.waitForDeployment();
  console.log("StakingRewards deployed to:", await staking.getAddress());

  // 3. Fund staking contract with 500k reward tokens
  const rewardAmount = ethers.parseEther("500000");
  await token.mint(deployer.address, rewardAmount);
  await token.approve(await staking.getAddress(), rewardAmount);
  await staking.fundRewards(rewardAmount);
  console.log("Staking contract funded with 500,000 UDAY");

  // 4. Verify instructions
  console.log("\n=== Verify on Etherscan ===");
  console.log(`npx hardhat verify --network sepolia ${await token.getAddress()} ${deployer.address}`);
  console.log(`npx hardhat verify --network sepolia ${await staking.getAddress()} ${await token.getAddress()} ${deployer.address} 1000 7`);
}

main().catch((err) => { console.error(err); process.exit(1); });

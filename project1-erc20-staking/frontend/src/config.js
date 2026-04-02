// Contract addresses — update after deployment
// Run: npx hardhat run scripts/deploy.js --network sepolia

export const CONFIG = {
  network: {
    name: "Sepolia Testnet",
    chainId: 11155111,
    rpcUrl: import.meta.env.VITE_RPC_URL || "https://rpc.sepolia.org"
  },
  contracts: {
    token: {
      address: import.meta.env.VITE_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000",
      name: "UDAY Token",
      symbol: "UDAY",
      decimals: 18
    },
    staking: {
      address: import.meta.env.VITE_STAKING_ADDRESS || "0x0000000000000000000000000000000000000000",
      rewardRateBPS: 1000,   // 10% APY
      lockDays: 7,
      penaltyBPS: 500,       // 5%
      minimumStake: "100"    // UDAY
    }
  },
  etherscan: "https://sepolia.etherscan.io"
};

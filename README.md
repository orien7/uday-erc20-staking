# UDAY ERC-20 Staking Platform

> Production-grade ERC-20 token + staking rewards system — Solidity · Hardhat · React · Wagmi

[![Tests](https://img.shields.io/badge/tests-12%20passing-22c55e)](./project1-erc20-staking/test/)
[![Solidity](https://img.shields.io/badge/solidity-0.8.20-6366f1)](./project1-erc20-staking/contracts/)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Network](https://img.shields.io/badge/network-Sepolia%20Testnet-f59e0b)]()

---

## Overview

A non-custodial ERC-20 staking platform where users stake **UDAY tokens** and earn **10% APY** rewards over a 7-day lock period. Built to demonstrate production-grade smart contract engineering for fintech and Web3 roles.

**Author:** Uday Kumar BS — Angel Investor & Full-Stack/Blockchain Architect  
25+ years · Ex-LSEG · Deutsche Bank Innovation Lab · LCH  
[linkedin.com/in/udaykumarbs](https://linkedin.com/in/udaykumarbs) · [portfolioanalysis.in](https://portfolioanalysis.in)

---

## UI Preview

### Staking Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  U  UDAY Staking                    Sepolia  0xAbC1...  │
├──────────────┬──────────────┬──────────────┬────────────┤
│ Balance      │ Staked       │ Rewards      │ APY        │
│ 4,200 UDAY   │ 1,000 UDAY   │ 8.21 UDAY    │ 10%        │
└──────────────┴──────────────┴──────────────┴────────────┘
│ [Stake]  [Unstake]  [Claim]              Pool Stats     │
│ Amount: [________] [MAX]                 TVL: 125,400   │
│ Lock: 7d  Penalty: 5%  Yield: +100/yr   Rate: 10% APY  │
│ [      Stake UDAY      ]                Lock: 7 days    │
│ ✓ Transaction confirmed on Sepolia      Min: 100 UDAY   │
└─────────────────────────────────────────────────────────┘
```

---

## Architecture

```
User (MetaMask / WalletConnect / Ledger)
         │
         ▼
React + Wagmi + Viem (Frontend)
         │
         ├──► UDAYToken.sol  (ERC-20)
         │         │ approve()
         └──► StakingRewards.sol
                   │ stake() / unstake() / claimRewards()
                   ▼
           Ethereum · Sepolia Testnet
                   │
         ┌─────────┼─────────┐
         ▼         ▼         ▼
      Infura   Cloudflare  Etherscan
      (RPC)    (CDN+WAF)   (Verify)
                   │
         ┌─────────┼─────────┐
         ▼         ▼         ▼
    OZ Defender  Tenderly  Dune Analytics
    (Alerts)    (Simulate) (Dashboards)
```

---

## Smart Contracts

| Contract | Description |
|---|---|
| `UDAYToken.sol` | ERC-20, 1M max supply, Ownable2Step, burnable |
| `StakingRewards.sol` | Non-custodial staking, 10% APY, 7-day lock, ReentrancyGuard |

### Key Parameters

| Parameter | Value |
|---|---|
| Token name | UDAY Token (UDAY) |
| Max supply | 1,000,000 UDAY |
| Reward rate | 10% APY (1000 BPS) |
| Lock period | 7 days |
| Early exit penalty | 5% |
| Minimum stake | 100 UDAY |
| Solidity version | 0.8.20 (locked) |

---

## Security Features

- **ReentrancyGuard** on all state-changing functions
- **Checks-Effects-Interactions** pattern throughout
- **SafeERC20** for all token transfers
- **Ownable2Step** — two-step ownership transfer
- **Custom errors** — gas efficient, typed reverts
- **No floating pragma** — pinned to 0.8.20
- **Built-in overflow protection** — Solidity 0.8+

---

## Quick Start

### Prerequisites

```bash
node --version   # must be v22+
nvm install 22   # if needed
nvm use 22
```

### Install & Test

```bash
cd project1-erc20-staking
npm install
npx hardhat compile
npx hardhat test
```

Expected output:
```
  StakingRewards
    Staking
      ✔ should allow staking above minimum
      ✔ should reject stake below minimum
      ✔ should reject zero stake
      ✔ should update totalStaked
    Rewards
      ✔ should accrue rewards over time
      ✔ should allow claiming rewards without unstaking
      ✔ should reset rewards after claim
    Unstaking
      ✔ should apply penalty before lock period
      ✔ should not apply penalty after lock period
      ✔ should revert if nothing staked
    Emergency Withdraw
      ✔ should always apply penalty
      ✔ should clear stake info

  12 passing (3s)
```

### Deploy to Sepolia

```bash
# 1. Copy env file and fill in values
cp .env.example .env

# 2. Deploy
npx hardhat run scripts/deploy.js --network sepolia

# 3. Verify on Etherscan
npx hardhat verify --network sepolia <TOKEN_ADDRESS> <YOUR_ADDRESS>
npx hardhat verify --network sepolia <STAKING_ADDRESS> <TOKEN_ADDRESS> <YOUR_ADDRESS> 1000 7
```

### Run Frontend

```bash
cd frontend
npm install
npm install wagmi viem @tanstack/react-query
# Update src/config.js with deployed contract addresses
npm run dev
# Open http://localhost:5173
```

---

## Project Structure

```
project1-erc20-staking/
├── contracts/
│   ├── UDAYToken.sol          # ERC-20 token contract
│   └── StakingRewards.sol     # Staking rewards contract
├── scripts/
│   └── deploy.js              # Deploy + fund script
├── test/
│   └── StakingRewards.test.js # 12 unit tests
├── docs/
│   ├── DESIGN.md              # Architecture design document
│   └── SECURITY.md            # Security analysis
├── frontend/
│   └── src/
│       ├── App.jsx            # Staking dashboard UI
│       └── config.js          # Contract addresses
├── hardhat.config.cjs         # Hardhat configuration
├── package.json
├── .env.example
└── .gitignore
```

---

## Go-Live Checklist

### Testnet (Sepolia)
- [x] All 12 unit tests passing
- [ ] Contracts deployed to Sepolia
- [ ] Both contracts verified on Etherscan
- [ ] Reward pool funded (500k UDAY)
- [ ] Frontend connected and smoke tested
- [ ] MetaMask + WalletConnect tested

### Mainnet
- [ ] Independent security audit complete
- [ ] Gnosis Safe multisig as owner
- [ ] OpenZeppelin Defender configured
- [ ] Bug bounty live on Immunefi

---

## License

MIT — see [LICENSE](./LICENSE)

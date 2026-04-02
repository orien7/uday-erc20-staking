# Project 1 — ERC-20 Token + Staking Contract
## Design Document

### Overview
A production-grade ERC-20 token with an accompanying staking contract that rewards holders for locking their tokens over time. Deployed on Sepolia testnet.

---

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│   Wagmi + Viem  │  Wallet Connect  │  Dashboard UI  │
└────────────────────────┬────────────────────────────┘
                         │ ethers.js / wagmi
          ┌──────────────┴──────────────┐
          │                             │
┌─────────▼──────────┐      ┌──────────▼──────────────┐
│   UDAYToken.sol    │      │   StakingRewards.sol     │
│   (ERC-20)         │      │                          │
│  - mint()          │      │  - stake(amount)         │
│  - burn()          │      │  - unstake(amount)       │
│  - transfer()      │      │  - claimRewards()        │
│  - approve()       │      │  - getReward()           │
└────────────────────┘      │  - earned(address)       │
                            └──────────────────────────┘
```

---

### Smart Contracts

#### UDAYToken.sol
- Standard ERC-20 with OpenZeppelin base
- Fixed supply: 1,000,000 UDAY
- Owner can mint up to max supply
- Burnable by token holders

#### StakingRewards.sol
- Non-custodial: users retain economic ownership
- Reward rate: 10% APY (configurable by owner)
- Minimum stake: 100 UDAY
- Lock period: 7 days (configurable)
- Rewards accrue per block, claimable any time
- Emergency withdrawal with penalty (5%)

---

### Security Considerations
- ReentrancyGuard on all state-changing functions
- checks-effects-interactions pattern throughout
- No floating pragma — locked to 0.8.20
- Owner functions protected by Ownable2Step
- Overflow impossible (Solidity 0.8+)

---

### Test Coverage Targets
| Function | Unit | Integration |
|---|---|---|
| stake() | ✓ | ✓ |
| unstake() | ✓ | ✓ |
| claimRewards() | ✓ | ✓ |
| earned() | ✓ | - |
| emergencyWithdraw() | ✓ | - |
| Edge cases (zero, overflow) | ✓ | - |

---

### Deployment
1. Deploy UDAYToken → get token address
2. Deploy StakingRewards(tokenAddress, rewardRate)
3. Transfer reward pool tokens to StakingRewards contract
4. Verify both contracts on Etherscan
5. Update frontend config with addresses

---

### Gas Estimates
| Function | Estimated Gas |
|---|---|
| stake() | ~85,000 |
| unstake() | ~65,000 |
| claimRewards() | ~55,000 |
| emergencyWithdraw() | ~70,000 |

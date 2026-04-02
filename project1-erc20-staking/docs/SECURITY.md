# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x (Sepolia) | Yes |
| Mainnet | Not yet deployed |

## Security Features

### Smart Contract Level
- **ReentrancyGuard** on all state-changing functions
- **Checks-Effects-Interactions** pattern throughout
- **SafeERC20** for all token transfers — handles non-standard ERC-20s
- **Ownable2Step** — two-step ownership transfer prevents accidental loss
- **Custom errors** — typed, gas-efficient reverts
- **No floating pragma** — locked to Solidity 0.8.20
- **Overflow protection** — built-in Solidity 0.8+ arithmetic safety

### Attack Mitigations

| Attack | Mitigation |
|---|---|
| Reentrancy | ReentrancyGuard + CEI pattern |
| Flash loan manipulation | No price oracles — fixed rate |
| Front-running | Fixed-rate staking — not AMM |
| Ownership takeover | Ownable2Step two-step transfer |
| Reward pool drain | Balance check before reward transfer |
| Precision loss | 1e18 integer math throughout |

### Pre-Mainnet Requirements
- Independent security audit (Trail of Bits / Certik / Sherlock)
- Slither static analysis — zero high/medium findings
- Mythril symbolic execution — zero vulnerabilities
- Gnosis Safe multisig as owner address

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report privately to: **uday.kumarbs@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

Response time: within 48 hours.

For mainnet deployment a bug bounty programme will be established on Immunefi.

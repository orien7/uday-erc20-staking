// frontend/src/App.jsx  — ERC-20 Staking Dashboard
// Run: npm create vite@latest . -- --template react && npm install && npm run dev
// Dependencies: npm install wagmi viem @tanstack/react-query

import { useState, useEffect } from "react";

// ── Mock data for UI preview (replace with wagmi hooks for live) ──
const MOCK = {
  walletAddress: "0xAbC1...9f3E",
  tokenBalance: "4200.00",
  stakedAmount: "1000.00",
  pendingRewards: "8.21",
  apy: "10",
  lockDays: 7,
  unlockDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  isLocked: true,
  totalStaked: "125,400.00",
};

const ACCENT = "#6366f1";
const DARK = "#0f0f1a";
const CARD = "#1a1a2e";
const BORDER = "#2a2a4a";

function StatCard({ label, value, sub, highlight }) {
  return (
    <div style={{
      background: highlight ? `${ACCENT}22` : CARD,
      border: `1px solid ${highlight ? ACCENT : BORDER}`,
      borderRadius: 12, padding: "20px 24px", flex: 1, minWidth: 160
    }}>
      <div style={{ color: "#888", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ color: highlight ? ACCENT : "#fff", fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{value}</div>
      {sub && <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div style={{ background: "#2a2a4a", borderRadius: 99, height: 8, overflow: "hidden", marginTop: 8 }}>
      <div style={{ background: `linear-gradient(90deg, ${ACCENT}, #a855f7)`, width: `${percent}%`, height: "100%", borderRadius: 99, transition: "width 0.6s" }} />
    </div>
  );
}

export default function App() {
  const [stakeInput, setStakeInput] = useState("");
  const [tab, setTab] = useState("stake");
  const [txStatus, setTxStatus] = useState(null);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const diff = MOCK.unlockDate - Date.now();
    setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
  }, []);

  const lockProgress = Math.round(((7 - days) / 7) * 100);

  function handleAction(action) {
    setTxStatus("pending");
    setTimeout(() => setTxStatus("success"), 1800);
    setTimeout(() => setTxStatus(null), 4000);
  }

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>U</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>UDAY Staking</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#888", fontSize: 13 }}>Sepolia Testnet</span>
          <div style={{ background: "#22c55e22", border: "1px solid #22c55e44", borderRadius: 99, padding: "6px 14px", fontSize: 13, color: "#22c55e" }}>
            {MOCK.walletAddress}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
        {/* Stats Row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <StatCard label="Your Balance" value={`${MOCK.tokenBalance} UDAY`} />
          <StatCard label="Staked" value={`${MOCK.stakedAmount} UDAY`} />
          <StatCard label="Pending Rewards" value={`${MOCK.pendingRewards} UDAY`} highlight />
          <StatCard label="Current APY" value={`${MOCK.apy}%`} sub="Annualised" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Left — Action Panel */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#0f0f1a", borderRadius: 10, padding: 4 }}>
              {["stake", "unstake", "claim"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, textTransform: "capitalize",
                  background: tab === t ? ACCENT : "transparent", color: tab === t ? "#fff" : "#666", transition: "all 0.2s"
                }}>{t}</button>
              ))}
            </div>

            {tab === "stake" && (
              <>
                <label style={{ color: "#888", fontSize: 12, display: "block", marginBottom: 8 }}>AMOUNT TO STAKE</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <input value={stakeInput} onChange={e => setStakeInput(e.target.value)}
                    placeholder="0.00"
                    style={{ flex: 1, background: "#0f0f1a", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 16, outline: "none" }} />
                  <button onClick={() => setStakeInput(MOCK.tokenBalance)}
                    style={{ background: `${ACCENT}33`, border: `1px solid ${ACCENT}44`, color: ACCENT, borderRadius: 8, padding: "0 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>MAX</button>
                </div>
                <div style={{ background: "#0f0f1a", borderRadius: 10, padding: "14px 16px", marginBottom: 20, fontSize: 13, color: "#888" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span>Lock Period</span><span style={{ color: "#fff" }}>7 days</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span>Early Exit Penalty</span><span style={{ color: "#f87171" }}>5%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Estimated Annual Yield</span>
                    <span style={{ color: "#22c55e" }}>+{stakeInput ? ((parseFloat(stakeInput) * 0.1)).toFixed(2) : "0.00"} UDAY</span>
                  </div>
                </div>
                <button onClick={() => handleAction("stake")} style={{
                  width: "100%", padding: 14, background: ACCENT, border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>Stake UDAY</button>
              </>
            )}

            {tab === "unstake" && (
              <>
                <div style={{ background: MOCK.isLocked ? "#f8711722" : "#22c55e22", border: `1px solid ${MOCK.isLocked ? "#f87171" : "#22c55e"}44`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: MOCK.isLocked ? "#f87171" : "#22c55e", fontWeight: 600 }}>
                    {MOCK.isLocked ? `⚠ Locked — ${days} days remaining (5% early exit penalty)` : "✓ Lock period complete — penalty-free withdrawal"}
                  </div>
                  <ProgressBar percent={lockProgress} />
                </div>
                <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>Staked: <span style={{ color: "#fff" }}>{MOCK.stakedAmount} UDAY</span></div>
                <input placeholder={`Max: ${MOCK.stakedAmount}`}
                  style={{ width: "100%", background: "#0f0f1a", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
                <button onClick={() => handleAction("unstake")} style={{
                  width: "100%", padding: 14, background: "#f8711733", border: "1px solid #f87171", borderRadius: 10, color: "#f87171", fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>Unstake Tokens</button>
              </>
            )}

            {tab === "claim" && (
              <>
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>Available Rewards</div>
                  <div style={{ color: ACCENT, fontSize: 42, fontWeight: 800, fontFamily: "monospace", marginBottom: 4 }}>{MOCK.pendingRewards}</div>
                  <div style={{ color: "#888", fontSize: 14 }}>UDAY tokens</div>
                  <div style={{ color: "#22c55e", fontSize: 13, marginTop: 8 }}>≈ $4.11 USD</div>
                </div>
                <button onClick={() => handleAction("claim")} style={{
                  width: "100%", padding: 14, background: "#22c55e22", border: "1px solid #22c55e", borderRadius: 10, color: "#22c55e", fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>Claim Rewards</button>
              </>
            )}

            {txStatus === "pending" && (
              <div style={{ marginTop: 14, background: "#6366f122", border: "1px solid #6366f1", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: ACCENT }}>
                ⏳ Transaction submitted — awaiting confirmation...
              </div>
            )}
            {txStatus === "success" && (
              <div style={{ marginTop: 14, background: "#22c55e22", border: "1px solid #22c55e", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#22c55e" }}>
                ✓ Transaction confirmed on Sepolia
              </div>
            )}
          </div>

          {/* Right — Info Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Pool Statistics</div>
              {[
                ["Total Value Locked", `${MOCK.totalStaked} UDAY`],
                ["Reward Rate", "10% APY"],
                ["Lock Period", "7 days"],
                ["Early Exit Penalty", "5%"],
                ["Minimum Stake", "100 UDAY"],
                ["Network", "Sepolia Testnet"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${BORDER}`, fontSize: 14 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 600, marginBottom: 14 }}>Reward Projections</div>
              {[
                ["1 Month", (1000 * 0.10 / 12).toFixed(2)],
                ["3 Months", (1000 * 0.10 / 4).toFixed(2)],
                ["6 Months", (1000 * 0.10 / 2).toFixed(2)],
                ["1 Year", (1000 * 0.10).toFixed(2)],
              ].map(([period, reward]) => (
                <div key={period} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
                  <span style={{ color: "#888" }}>{period}</span>
                  <span style={{ color: "#22c55e", fontWeight: 600 }}>+{reward} UDAY</span>
                </div>
              ))}
              <div style={{ marginTop: 8, fontSize: 11, color: "#555" }}>Based on current 1,000 UDAY stake at 10% APY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

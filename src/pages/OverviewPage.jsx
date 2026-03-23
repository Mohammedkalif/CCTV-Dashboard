import MetricCard from "../components/MetricCard.jsx";
import { ICONS } from "../components/Icon.jsx";
import { S } from "../styles/styles.js";
import { VENUES } from "../data/mockData.js";

export default function OverviewPage({ logs }) {
  const total     = VENUES.reduce((a, v) => a + v.authorized + v.unauthorized + v.unknown, 0);
  const totalAuth = VENUES.reduce((a, v) => a + v.authorized, 0);
  const totalUnauth = VENUES.reduce((a, v) => a + v.unauthorized, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={S.h1}>Overview</h1>
        <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
          Today · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="Total Detections" value={total.toLocaleString()} sub="Today" icon={ICONS.users} />
        <MetricCard label="Authorized"        value={totalAuth.toLocaleString()} sub={`${Math.round(totalAuth / total * 100)}% of total`} color="#2e7d32" icon={ICONS.shield} />
        <MetricCard label="Unauthorized"      value={totalUnauth.toLocaleString()} sub="Flagged" color="#c62828" icon={ICONS.alert} />
        <MetricCard label="Active Cameras"    value="4 / 4" sub="All online" color="#1565c0" icon={ICONS.camera} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Venue breakdown */}
        <div style={S.card}>
          <h2 style={S.h2}>Camera venues</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {VENUES.map(v => {
              const tot     = v.authorized + v.unauthorized + v.unknown;
              const authPct = Math.round(v.authorized   / tot * 100);
              const unPct   = Math.round(v.unauthorized / tot * 100);
              const ukPct   = Math.round(v.unknown      / tot * 100);
              return (
                <div key={v.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{v.name}</span>
                      <span style={{ fontSize: 11, color: "#aaa", marginLeft: 8 }}>{v.camera}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>{tot} detected</div>
                  </div>
                  <div style={S.barBg}>
                    <div style={{ height: 6, borderRadius: 3, display: "flex", overflow: "hidden" }}>
                      <div style={{ width: `${authPct}%`, background: "#4caf50" }} />
                      <div style={{ width: `${unPct}%`,  background: "#ef5350" }} />
                      <div style={{ width: `${ukPct}%`,  background: "#ffb300" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#888", marginTop: 4 }}>
                    <span style={{ color: "#2e7d32" }}>✓ {v.authorized} auth</span>
                    <span style={{ color: "#c62828" }}>✗ {v.unauthorized} unauth</span>
                    <span style={{ color: "#e65100" }}>? {v.unknown} unknown</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent detections */}
        <div style={S.card}>
          <h2 style={S.h2}>Recent detections</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {logs.slice(0, 8).map(log => (
              <div
                key={log.id}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid #f7f5f2",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background:
                    log.type === "authorized"   ? "#e8f5e9"
                    : log.type === "unauthorized" ? "#fdecea"
                    : "#fff8e1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600,
                  color:
                    log.type === "authorized"   ? "#2e7d32"
                    : log.type === "unauthorized" ? "#c62828"
                    : "#e65100",
                }}>
                  {log.name[0]}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {log.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{log.roll} · {log.venue}</div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={S.badge(log.type)}>{log.type}</span>
                  <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
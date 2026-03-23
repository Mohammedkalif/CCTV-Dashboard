import Icon, { ICONS } from "../components/Icon";
import MetricCard from "../components/MetricCard";
import { S } from "../styles/styles";

export default function AlertsPage({ logs }) {
  const alerts = logs
    .filter(l => l.type === "unauthorized" || l.type === "unknown")
    .slice(0, 15)
    .map((l, i) => ({
      ...l,
      severity: l.type === "unauthorized" ? "high" : "medium",
      resolved: i > 6,
    }));

  const active   = alerts.filter(a => !a.resolved).length;
  const resolved = alerts.filter(a => a.resolved).length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={S.h1}>Alerts</h1>
        <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
          {active} active alert{active !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="Active alerts"      value={String(active)}   color="#c62828" />
        <MetricCard label="Resolved today"     value={String(resolved)} color="#2e7d32" />
        <MetricCard label="Avg response time"  value="4.2 min" />
      </div>

      {/* Alert list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {alerts.map(alert => (
          <div
            key={alert.id}
            style={{
              ...S.card,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: alert.resolved ? 0.55 : 1,
              borderLeft: `3px solid ${alert.severity === "high" ? "#ef5350" : "#ffb300"}`,
            }}
          >
            {/* Icon */}
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: alert.severity === "high" ? "#fdecea" : "#fff8e1",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon
                d={ICONS.alert}
                size={18}
                color={alert.severity === "high" ? "#c62828" : "#e65100"}
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {alert.type === "unauthorized"
                  ? "Unauthorized person detected"
                  : "Unknown face detected"}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                {alert.venue} · {alert.camera} · Roll: {alert.roll} · Confidence: {alert.confidence}
              </div>
            </div>

            {/* Status + time */}
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <span style={S.badge(alert.resolved ? "authorized" : "unauthorized")}>
                {alert.resolved ? "resolved" : "active"}
              </span>
              <div style={{ fontSize: 11, color: "#bbb", marginTop: 4, fontFamily: "monospace" }}>
                {alert.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import Icon from "./Icon";
import { S } from "../styles/styles";

export default function MetricCard({ label, value, sub, color = "#1a1a1a", icon }) {
  return (
    <div style={S.metricCard}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={S.label}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 600, color, margin: "6px 0 4px", letterSpacing: -1 }}>
            {value}
          </div>
          {sub && <div style={{ fontSize: 12, color: "#888" }}>{sub}</div>}
        </div>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "#f7f6f3",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={icon} size={16} color="#888" />
          </div>
        )}
      </div>
    </div>
  );
}
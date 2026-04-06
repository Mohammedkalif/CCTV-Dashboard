import { useLocation } from "react-router-dom";
import { S } from "../styles/styles";

const PATH_LABELS = {
  "/": "Overview",
  "/live": "Live Feed",
  "/analytics": "Analytics",
  "/logs": "Detection Log",
  "/alerts": "Alerts",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const label = PATH_LABELS[pathname] || "Dashboard";

  return (
    <div style={S.topbar}>
      <div style={{ fontSize: 13, color: "#6B7280" }}>
        <span style={{ color: "#0F3460", fontWeight: 600 }}>INTEC CCTV</span>
        <span style={{ margin: "0 8px", color: "#D1D5DB" }}>/</span>
        <span>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, color: "#059669",
          background: "#D1FAE5",
          padding: "4px 10px",
          borderRadius: 20,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#10B981", display: "inline-block",
          }} />
          System online
        </div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>
          {new Date().toLocaleTimeString("en-IN")}
        </div>
      </div>
    </div>
  );
}
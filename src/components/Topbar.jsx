import { S } from "../styles/styles";

export default function Topbar({ page }) {
  const label = page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div style={S.topbar}>
      <div style={{ fontSize: 13, color: "#888" }}>
        <span style={{ color: "#1a1a1a", fontWeight: 500 }}>INTEC CCTV</span>
        <span style={{ margin: "0 8px", color: "#ddd" }}>/</span>
        <span>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, color: "#4caf50",
          background: "#e8f5e9",
          padding: "4px 10px",
          borderRadius: 20,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#4caf50", display: "inline-block",
          }} />
          System online
        </div>
        <div style={{ fontSize: 12, color: "#888" }}>
          {new Date().toLocaleTimeString("en-IN")}
        </div>
      </div>
    </div>
  );
}
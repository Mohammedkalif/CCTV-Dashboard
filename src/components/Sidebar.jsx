import Icon, { ICONS } from "./Icon";
import { S } from "../styles/styles";

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview",      icon: ICONS.grid },
  { id: "live",      label: "Live Feed",     icon: ICONS.camera },
  { id: "analytics", label: "Analytics",    icon: ICONS.activity },
  { id: "logs",      label: "Detection Log", icon: ICONS.list },
  { id: "alerts",    label: "Alerts",        icon: ICONS.alert },
];

export default function Sidebar({ active, setActive, onLogout }) {
  return (
    <div style={S.sidebar}>
      <div style={{ padding: "20px 16px 16px" }}>
        {/* Brand */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 4px 20px",
          borderBottom: "1px solid #f0ede8",
        }}>
          <div style={{
            width: 30, height: 30,
            background: "#1a1a1a",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={ICONS.camera} size={15} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>INTEC CCTV</div>
            <div style={{ fontSize: 11, color: "#888" }}>v2.0 dashboard</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ marginTop: 12 }}>
          <div style={{ ...S.label, padding: "0 8px", marginBottom: 6 }}>Navigation</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              style={S.navItem(active === item.id)}
              onClick={() => setActive(item.id)}
            >
              <Icon
                d={item.icon}
                size={15}
                color={active === item.id ? "#1a1a1a" : "#888"}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* User + logout */}
      <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #f0ede8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: "50%",
            background: "#f0ede8",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600,
          }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Admin</div>
            <div style={{ fontSize: 11, color: "#888" }}>admin@intec.ac.in</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{ ...S.btn, width: "100%", justifyContent: "center", fontSize: 12, color: "#e53935" }}
        >
          <Icon d={ICONS.logout} size={14} color="#e53935" />
          Sign out
        </button>
      </div>
    </div>
  );
}
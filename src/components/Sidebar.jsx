import { NavLink } from "react-router-dom";
import Icon, { ICONS } from "./Icon";
import { S } from "../styles/styles";

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview",      icon: ICONS.grid,     path: "/" },
  { id: "live",      label: "Live Feed",     icon: ICONS.camera,   path: "/live" },
  { id: "analytics", label: "Analytics",    icon: ICONS.activity, path: "/analytics" },
  { id: "logs",      label: "Detection Log", icon: ICONS.list,     path: "/logs" },
  { id: "alerts",    label: "Alerts",        icon: ICONS.alert,    path: "/alerts" },
];

export default function Sidebar({ onLogout }) {
  return (
    <div style={S.sidebar}>
      <div style={{ padding: "20px 16px 16px" }}>
        {/* Brand */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 4px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{
            width: 30, height: 30,
            background: "#fff",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={ICONS.camera} size={15} color="#0F3460" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>INTEC CCTV</div>
            <div style={{ fontSize: 11, color: "#CBD5E1" }}>v2.0 dashboard</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ marginTop: 12 }}>
          <div style={{ ...S.label, padding: "0 8px", marginBottom: 6, color: "#94A3B8" }}>Navigation</div>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              style={({ isActive }) => ({
                ...S.navItem(isActive),
                textDecoration: "none",
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    d={item.icon}
                    size={15}
                    color={isActive ? "#fff" : "#CBD5E1"}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* User + logout */}
      <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, color: "#fff",
          }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>Admin</div>
            <div style={{ fontSize: 11, color: "#CBD5E1" }}>admin@intec.ac.in</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{ ...S.btn, width: "100%", justifyContent: "center", fontSize: 12, color: "#FCA5A5", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Icon d={ICONS.logout} size={14} color="#FCA5A5" />
          Sign out
        </button>
      </div>
    </div>
  );
}
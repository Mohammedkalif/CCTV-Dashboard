import { useState } from "react";
import Icon, { ICONS } from "./Icon";
import { S } from "../styles/styles";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (user === "admin" && pass === "1234") {
      setLoading(true);
      setTimeout(onLogin, 800);
    } else {
      setErr("Invalid credentials. Try admin / 1234");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F9FB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        display: "flex",
        gap: 0,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        width: 760,
        maxWidth: "95vw",
      }}>
        {/* ── Left dark panel ── */}
        <div style={{
          flex: 1,
          background: "#0F3460",
          padding: "52px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
              <div style={{
                width: 32, height: 32,
                background: "#fff",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon d={ICONS.camera} size={16} color="#0F3460" />
              </div>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>INTEC CCTV</span>
            </div>

            <h1 style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: 600,
              margin: "0 0 12px",
              lineHeight: 1.3,
              letterSpacing: -0.5,
            }}>
              Intelligent<br />Surveillance
            </h1>
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Real-time face recognition and access monitoring across all campus venues.
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["4",      "Cameras"],
              ["1.2k",  "Students"],
              ["99.2%", "Uptime"],
              ["~30ms", "Latency"],
            ].map(([v, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{v}</div>
                <div style={{ fontSize: 12, color: "#CBD5E1", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div style={{
          width: 340,
          background: "#fff",
          padding: "52px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 6px", letterSpacing: -0.3, color: "#0F3460" }}>
            Sign in
          </h2>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 32px" }}>
            Access the admin dashboard
          </p>

          {err && (
            <div style={{
              background: "#FEE2E2",
              border: "1px solid #FECACA",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: "#991B1B",
              marginBottom: 16,
            }}>
              {err}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ ...S.label, display: "block", marginBottom: 6, color: "#6B7280" }}>Username</label>
            <input
              value={user}
              onChange={e => { setUser(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="admin"
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "10px 12px", fontSize: 14,
                border: "1px solid #E5E7EB", borderRadius: 8,
                outline: "none", fontFamily: "inherit", color: "#2C3E50",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ ...S.label, display: "block", marginBottom: 6, color: "#6B7280" }}>Password</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="••••••••"
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "10px 12px", fontSize: 14,
                border: "1px solid #E5E7EB", borderRadius: 8,
                outline: "none", fontFamily: "inherit", color: "#2C3E50",
              }}
            />
          </div>

          <button
            onClick={submit}
            style={{
              ...S.btnPrimary,
              width: "100%",
              padding: "11px",
              fontSize: 14,
              borderRadius: 10,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 24, textAlign: "center" }}>
            Demo: admin / 1234
          </p>
        </div>
      </div>
    </div>
  );
}
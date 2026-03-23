import { useState, useEffect } from "react";
import { S } from "../styles/styles";
import { VENUES } from "../data/mockData";

export default function LiveFeedPage({ logs }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={S.h1}>Live feed</h1>
          <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>
            All cameras · Auto-refresh every 3s
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4caf50" }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4caf50", display: "inline-block",
            boxShadow: "0 0 0 2px #c8e6c9",
          }} />
          4 cameras online
        </div>
      </div>

      {/* Camera grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {VENUES.map((cam) => {
          const recent = logs.filter(l => l.venue === cam.name).slice(0, 4);
          const fps = Math.floor(Math.random() * 5 + 27);
          const detections = Math.floor(Math.random() * 3) + (tick % 2);

          return (
            <div key={cam.id} style={S.card}>
              {/* Fake camera viewport */}
              <div style={{
                height: 180,
                background: "#111",
                borderRadius: 8,
                marginBottom: 14,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Background gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
                }} />

                {/* Grid overlay */}
                <svg style={{ position: "absolute", inset: 0, opacity: 0.06 }} width="100%" height="100%">
                  <defs>
                    <pattern id={`g${cam.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#fff" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#g${cam.id})`} />
                </svg>

                {/* Detection boxes */}
                {detections > 0 && (
                  <div style={{
                    position: "absolute", top: 40, left: 30,
                    width: 50, height: 70,
                    border: "1.5px solid #4caf50", borderRadius: 2,
                  }}>
                    <span style={{
                      position: "absolute", top: -16, left: 0,
                      fontSize: 9, color: "#4caf50",
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.6)",
                      padding: "1px 4px", borderRadius: 2,
                      whiteSpace: "nowrap",
                    }}>AUTH 0.94</span>
                  </div>
                )}
                {detections > 1 && (
                  <div style={{
                    position: "absolute", top: 55, right: 50,
                    width: 44, height: 62,
                    border: "1.5px solid #ef5350", borderRadius: 2,
                  }}>
                    <span style={{
                      position: "absolute", top: -16, left: 0,
                      fontSize: 9, color: "#ef5350",
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.6)",
                      padding: "1px 4px", borderRadius: 2,
                      whiteSpace: "nowrap",
                    }}>UNAUTH 0.81</span>
                  </div>
                )}

                {/* HUD — top */}
                <div style={{
                  position: "absolute", top: 10, left: 12,
                  fontSize: 11, fontFamily: "monospace",
                  color: "#aaa", display: "flex", gap: 16,
                }}>
                  <span style={{ color: "#4caf50" }}>● REC</span>
                  <span>{cam.camera}</span>
                  <span>{fps} fps</span>
                </div>

                {/* HUD — bottom */}
                <div style={{
                  position: "absolute", bottom: 10, left: 12,
                  fontSize: 10, fontFamily: "monospace", color: "#777",
                }}>
                  {new Date().toLocaleTimeString("en-IN")} · {cam.location}
                </div>
                <div style={{
                  position: "absolute", bottom: 10, right: 12,
                  fontSize: 10, color: "#555", fontFamily: "monospace",
                }}>
                  {detections} detected
                </div>
              </div>

              {/* Camera info */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{cam.name}</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>{cam.location} · {cam.camera}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={S.badge("authorized")}>{cam.authorized} auth</span>
                  <span style={S.badge("unauthorized")}>{cam.unauthorized} unauth</span>
                </div>
              </div>

              {/* Recent detections for this camera */}
              {recent.length > 0 && (
                <div>
                  <div style={{ ...S.label, marginBottom: 6 }}>Recent detections</div>
                  {recent.map(l => (
                    <div key={l.id} style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 0",
                      borderBottom: "1px solid #f7f5f2",
                      fontSize: 12,
                    }}>
                      <span style={{ fontWeight: 500 }}>{l.roll}</span>
                      <span style={S.badge(l.type)}>{l.type}</span>
                      <span style={{ color: "#aaa", fontFamily: "monospace" }}>{l.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { useEffect, useRef } from "react";
import MetricCard from "../components/MetricCard";
import { S } from "../styles/styles";
import { HOURLY_BASE } from "../data/mockData";

export default function AnalyticsPage() {
  const chartsRef = useRef([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = () => {
      chartsRef.current.forEach(c => c.destroy());
      chartsRef.current = [];

      // 1 — Hourly line chart
      const c1 = document.getElementById("hourlyChart");
      if (c1) {
        chartsRef.current.push(new window.Chart(c1, {
          type: "line",
          data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
              {
                label: "Authorized",
                data: HOURLY_BASE.map(v => Math.round(v * 0.88 + Math.random() * 5)),
                borderColor: "#4caf50", backgroundColor: "#4caf5020",
                fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2,
              },
              {
                label: "Unauthorized",
                data: HOURLY_BASE.map(v => Math.round(v * 0.1 + Math.random() * 3)),
                borderColor: "#ef5350", backgroundColor: "#ef535020",
                fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: "#f0ede8" }, ticks: { color: "#aaa", font: { size: 10 }, maxTicksLimit: 12 } },
              y: { grid: { color: "#f0ede8" }, ticks: { color: "#aaa", font: { size: 11 } } },
            },
          },
        }));
      }

      // 2 — Doughnut
      const c2 = document.getElementById("pieChart");
      if (c2) {
        chartsRef.current.push(new window.Chart(c2, {
          type: "doughnut",
          data: {
            labels: ["Authorized", "Unauthorized", "Unknown"],
            datasets: [{
              data: [1176, 80, 30],
              backgroundColor: ["#4caf50", "#ef5350", "#ffb300"],
              borderWidth: 0, hoverOffset: 4,
            }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            cutout: "72%",
            plugins: { legend: { display: false } },
          },
        }));
      }

      // 3 — Weekly bar
      const c3 = document.getElementById("weekChart");
      if (c3) {
        chartsRef.current.push(new window.Chart(c3, {
          type: "bar",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Authorized",
                data: [820, 910, 875, 940, 880, 320, 150],
                backgroundColor: "#4caf5060", borderColor: "#4caf50",
                borderWidth: 1.5, borderRadius: 4,
              },
              {
                label: "Unauthorized",
                data: [45, 62, 55, 70, 58, 22, 10],
                backgroundColor: "#ef535060", borderColor: "#ef5350",
                borderWidth: 1.5, borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: "#aaa", font: { size: 11 } } },
              y: { grid: { color: "#f0ede8" }, ticks: { color: "#aaa", font: { size: 11 } } },
            },
          },
        }));
      }
    };

    document.head.appendChild(script);
    return () => { chartsRef.current.forEach(c => c.destroy()); };
  }, []);

  const legendDot = (color, label) => (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
      {label}
    </span>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={S.h1}>Analytics</h1>
        <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>Detection trends and statistics</p>
      </div>

      {/* Summary metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="Avg daily detections" value="791"    sub="+4.2% vs last week" />
        <MetricCard label="Peak hour"             value="10:00"  sub="82 detections" />
        <MetricCard label="Accuracy rate"         value="98.3%" sub="InsightFace score" />
        <MetricCard label="Alerts today"          value="18"    sub="5 reviewed" />
      </div>

      {/* Row 1: hourly + doughnut */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ ...S.h2, margin: 0 }}>Hourly detections — today</h2>
            <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#888" }}>
              {legendDot("#4caf50", "Authorized")}
              {legendDot("#ef5350", "Unauthorized")}
            </div>
          </div>
          <div style={{ position: "relative", height: 220 }}>
            <canvas id="hourlyChart" />
          </div>
        </div>

        <div style={S.card}>
          <h2 style={S.h2}>Detection breakdown</h2>
          <div style={{ position: "relative", height: 160 }}>
            <canvas id="pieChart" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {[
              ["Authorized",   "#4caf50", "90.5%"],
              ["Unauthorized", "#ef5350",  "6.2%"],
              ["Unknown",      "#ffb300",  "2.3%"],
            ].map(([l, c, p]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block", flexShrink: 0 }} />
                <span style={{ flex: 1, color: "#555" }}>{l}</span>
                <span style={{ fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: weekly bars */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ ...S.h2, margin: 0 }}>Weekly detection volume</h2>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#888" }}>
            {legendDot("#4caf50", "Authorized")}
            {legendDot("#ef5350", "Unauthorized")}
          </div>
        </div>
        <div style={{ position: "relative", height: 220 }}>
          <canvas id="weekChart" />
        </div>
      </div>
    </div>
  );
}
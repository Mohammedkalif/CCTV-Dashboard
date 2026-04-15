import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import MetricCard from "../components/MetricCard";
import { ICONS } from "../components/Icon";
import { buildDailyStats, buildHourlyStats, buildSummary, getHourWindowLabel } from "../data/mockData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#142033",
      titleColor: "#ffffff",
      bodyColor: "#dbe5f1",
      padding: 12,
      displayColors: false,
    },
  },
};

export default function AnalyticsPage() {
  const { logs } = useOutletContext();
  const summary = buildSummary(logs);
  const hourlyStats = buildHourlyStats(logs);
  const dailyStats = buildDailyStats(logs);
  const [selectedHour, setSelectedHour] = useState(summary.peakHour.hour);
  const [focus, setFocus] = useState("people");

  const hourDetail = hourlyStats[selectedHour];
  const focusCopy = {
    overview: "Track the overall detection mix, hourly trend, and the busiest periods across the last 24 hours.",
    people: "Use this option to answer the key question: how many people were seen in a particular hour window.",
    risk: "Review how many unauthorized and unknown faces clustered in the selected hour.",
  };

  const hourlyLineData = {
    labels: hourlyStats.map((hour) => hour.label),
    datasets: [
      {
        label: "People",
        data: hourlyStats.map((hour) => hour.people),
        borderColor: "#2d5baf",
        backgroundColor: "rgba(45, 91, 175, 0.16)",
        fill: true,
        tension: 0.34,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Authorized",
        data: hourlyStats.map((hour) => hour.authorized),
        borderColor: "#1f9d74",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.34,
        pointRadius: 3,
      },
      {
        label: "Unauthorized",
        data: hourlyStats.map((hour) => hour.unauthorized + hour.unknown),
        borderColor: "#cb4d4d",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.34,
        pointRadius: 3,
        borderDash: [7, 5],
      },
    ],
  };

  const doughnutData = {
    labels: ["Authorized", "Unauthorized", "Unknown"],
    datasets: [
      {
        data: [hourDetail.authorized, hourDetail.unauthorized, hourDetail.unknown],
        backgroundColor: ["#1f9d74", "#cb4d4d", "#c98632"],
        borderWidth: 0,
      },
    ],
  };

  const dailyBarData = {
    labels: dailyStats.map((day) => day.label),
    datasets: [
      {
        label: "Authorized",
        data: dailyStats.map((day) => day.authorized),
        backgroundColor: "#1f9d74",
        borderRadius: 10,
      },
      {
        label: "Flagged",
        data: dailyStats.map((day) => day.unauthorized),
        backgroundColor: "#cb4d4d",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="page-stack">
      <section className="card">
        <div className="toolbar-row">
          <div>
            <p className="eyebrow">Analytics controls</p>
            <h2 className="card-title">Choose what to focus on</h2>
            <p className="card-copy">{focusCopy[focus]}</p>
          </div>

          <div className="pill-row">
            {[
              ["overview", "Traffic overview"],
              ["people", "People in hour"],
              ["risk", "Risk pressure"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`tab-button${focus === value ? " is-active" : ""}`}
                onClick={() => setFocus(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="metrics-grid metrics-grid--three">
        <MetricCard
          label="People in selected hour"
          value={hourDetail.people.toLocaleString()}
          sub={getHourWindowLabel(selectedHour)}
          tone="blue"
          icon={ICONS.users}
        />
        <MetricCard
          label="Authorized in hour"
          value={hourDetail.authorized.toLocaleString()}
          sub={`${hourDetail.total} total detections`}
          tone="emerald"
          icon={ICONS.shield}
        />
        <MetricCard
          label="Flagged in hour"
          value={(hourDetail.unauthorized + hourDetail.unknown).toLocaleString()}
          sub="Unauthorized + unknown"
          tone="rose"
          icon={ICONS.alert}
        />
      </section>

      <section className="analytics-grid">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Hourly movement</p>
              <h2 className="card-title">How many people are in that particular hour?</h2>
              <p className="card-copy">Select an hour window to compare people volume against authorized and flagged detections.</p>
            </div>

            <label className="select-field" style={{ minWidth: 210 }}>
              <span className="mono-text">Hour</span>
              <select value={selectedHour} onChange={(event) => setSelectedHour(Number(event.target.value))}>
                {hourlyStats.map((hour) => (
                  <option key={hour.hour} value={hour.hour}>
                    {getHourWindowLabel(hour.hour)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="chart-legend" style={{ marginTop: 18 }}>
            <span className="legend-chip" style={{ color: "#2d5baf" }}>People</span>
            <span className="legend-chip" style={{ color: "#1f9d74" }}>Authorized</span>
            <span className="legend-chip" style={{ color: "#cb4d4d" }}>Flagged</span>
          </div>

          <div className="chart-wrap" style={{ marginTop: 20 }}>
            <Line
              data={hourlyLineData}
              options={{
                ...CHART_OPTIONS,
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: "#64748b" },
                  },
                  y: {
                    grid: { color: "rgba(20, 32, 51, 0.08)" },
                    ticks: { color: "#64748b" },
                  },
                },
              }}
            />
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Selected hour brief</p>
              <h2 className="card-title">{getHourWindowLabel(selectedHour)}</h2>
            </div>
            <span className="pill">{hourDetail.people} people</span>
          </div>

          <div className="chart-wrap chart-wrap--compact" style={{ marginTop: 18 }}>
            <Doughnut
              data={doughnutData}
              options={{
                ...CHART_OPTIONS,
                cutout: "68%",
              }}
            />
          </div>

          <div className="list-stack" style={{ marginTop: 18 }}>
            <div className="venue-row">
              <div className="venue-main">
                <strong>People count</strong>
                <span>Unique identities in the selected window</span>
              </div>
              <span className="badge badge--neutral">{hourDetail.people}</span>
            </div>
            <div className="venue-row">
              <div className="venue-main">
                <strong>Authorized pass-through</strong>
                <span>Successful recognized entries</span>
              </div>
              <span className="badge badge--authorized">{hourDetail.authorized}</span>
            </div>
            <div className="venue-row">
              <div className="venue-main">
                <strong>Risk events</strong>
                <span>Unauthorized and unknown detections</span>
              </div>
              <span className="badge badge--unauthorized">{hourDetail.unauthorized + hourDetail.unknown}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Daily volume</p>
            <h2 className="card-title">Detection pattern across the last 7 days</h2>
          </div>
          <div className="chart-legend">
            <span className="legend-chip" style={{ color: "#1f9d74" }}>Authorized</span>
            <span className="legend-chip" style={{ color: "#cb4d4d" }}>Flagged</span>
          </div>
        </div>

        <div className="chart-wrap" style={{ marginTop: 20 }}>
          <Bar
            data={dailyBarData}
            options={{
              ...CHART_OPTIONS,
              scales: {
                x: {
                  stacked: false,
                  grid: { display: false },
                  ticks: { color: "#64748b" },
                },
                y: {
                  grid: { color: "rgba(20, 32, 51, 0.08)" },
                  ticks: { color: "#64748b" },
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}

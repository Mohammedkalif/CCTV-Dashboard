import { useOutletContext } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import { ICONS } from "../components/Icon";
import { buildSummary, buildVenueStats, formatFullDate, getTrafficChange, getHourWindowLabel } from "../data/mockData";

function getBadgeClass(type) {
  return `badge badge--${type}`;
}

function getAvatarClass(type) {
  return `avatar-tile avatar-tile--${type}`;
}

export default function OverviewPage() {
  const { logs } = useOutletContext();
  const summary = buildSummary(logs);
  const venueStats = buildVenueStats(logs).sort((left, right) => right.total - left.total);
  const trafficChange = getTrafficChange(logs);
  const activeAlerts = summary.unauthorized + summary.unknown;

  return (
    <div className="page-stack">
      <section className="hero-grid">
        <article className="hero-card hero-card--primary">
          <p className="eyebrow eyebrow--light">Campus command view</p>
          <h2 className="hero-title">Security alignment rebuilt around clarity, speed, and hourly movement.</h2>
          <p className="hero-copy">
            The dashboard now highlights the most important operational questions first: how many people came through, which hour was busiest, and where the riskiest detections happened.
          </p>

          <div className="hero-metrics">
            <div className="hero-metric">
              <span>People seen</span>
              <strong>{summary.people}</strong>
            </div>
            <div className="hero-metric">
              <span>Peak hour</span>
              <strong>{getHourWindowLabel(summary.peakHour.hour)}</strong>
            </div>
            <div className="hero-metric">
              <span>Flagged events</span>
              <strong>{activeAlerts}</strong>
            </div>
          </div>
        </article>

        <article className="hero-card hero-card--secondary">
          <p className="eyebrow">Operations brief</p>
          <h2 className="card-title">Most traffic is concentrated around {summary.peakHour.label}</h2>
          <p className="card-copy">
            Traffic is {trafficChange >= 0 ? `${trafficChange}% higher` : `${Math.abs(trafficChange)}% lower`} than the previous half-day window, which makes this a good time to watch entry points more closely.
          </p>

          <div className="list-stack" style={{ marginTop: 18 }}>
            <div className="pill-row">
              <span className="pill">Authorized {summary.authorized}</span>
              <span className="pill">Unauthorized {summary.unauthorized}</span>
              <span className="pill">Unknown {summary.unknown}</span>
            </div>
            <div className="surface-note">
              <strong>Priority note</strong>
              <p className="card-copy" style={{ marginTop: 8 }}>
                The new alignment gives more room to operational context and makes hourly people insights visible without leaving the dashboard flow.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="metrics-grid">
        <MetricCard
          label="Total detections"
          value={summary.total.toLocaleString()}
          sub="Rolling last 24 hours"
          tone="blue"
          icon={ICONS.wave}
        />
        <MetricCard
          label="People counted"
          value={summary.people.toLocaleString()}
          sub="Distinct faces and unknown entries"
          tone="emerald"
          icon={ICONS.users}
        />
        <MetricCard
          label="Unauthorized"
          value={summary.unauthorized.toLocaleString()}
          sub="Requires security review"
          tone="rose"
          icon={ICONS.alert}
        />
        <MetricCard
          label="Peak window"
          value={summary.peakHour.label}
          sub={`${summary.peakHour.people} people moved through that hour`}
          tone="amber"
          icon={ICONS.clock}
        />
      </section>

      <section className="split-grid">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Venue performance</p>
              <h2 className="card-title">Camera zones in the last 24 hours</h2>
            </div>
            <span className="pill">4 active cameras</span>
          </div>

          <div className="list-stack" style={{ marginTop: 10 }}>
            {venueStats.map((venue) => {
              const safeTotal = venue.total || 1;
              const authorizedPct = (venue.authorized / safeTotal) * 100;
              const unauthorizedPct = (venue.unauthorized / safeTotal) * 100;
              const unknownPct = (venue.unknown / safeTotal) * 100;

              return (
                <div key={venue.id} className="venue-row">
                  <div style={{ flex: 1 }}>
                    <div className="item-row" style={{ marginBottom: 8 }}>
                      <div className="venue-main">
                        <strong>{venue.name}</strong>
                        <span>{venue.location} · {venue.camera}</span>
                      </div>
                      <span className="pill">{venue.people} people</span>
                    </div>

                    <div className="progress-track">
                      <div className="progress-track__fill--authorized" style={{ width: `${authorizedPct}%` }} />
                      <div className="progress-track__fill--unauthorized" style={{ width: `${unauthorizedPct}%` }} />
                      <div className="progress-track__fill--unknown" style={{ width: `${unknownPct}%` }} />
                    </div>

                    <div className="pill-row" style={{ marginTop: 10 }}>
                      <span className="badge badge--authorized">{venue.authorized} authorized</span>
                      <span className="badge badge--unauthorized">{venue.unauthorized} unauthorized</span>
                      <span className="badge badge--unknown">{venue.unknown} unknown</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2 className="card-title">Latest detections</h2>
            </div>
            <span className="pill">{logs.slice(0, 6).length} most recent</span>
          </div>

          <div className="list-stack">
            {logs.slice(0, 6).map((log) => (
              <div key={log.id} className="timeline-item">
                <div className="log-person">
                  <div className={getAvatarClass(log.type)}>
                    {log.name === "Unknown" ? "?" : log.name[0]}
                  </div>
                  <div>
                    <strong>{log.name}</strong>
                    <span>{log.roll} · {log.venue}</span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span className={getBadgeClass(log.type)}>{log.type}</span>
                  <div className="mono-text" style={{ marginTop: 6 }}>{formatFullDate(log.ts)}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

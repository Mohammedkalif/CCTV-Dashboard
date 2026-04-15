import { NavLink } from "react-router-dom";
import Icon, { ICONS } from "./Icon";
import { buildSummary, getRetentionWindow } from "../data/mockData";

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview", icon: ICONS.grid, path: "/", meta: "Executive snapshot" },
  { id: "live", label: "Live Feed", icon: ICONS.camera, path: "/live", meta: "Camera wall" },
  { id: "analytics", label: "Analytics", icon: ICONS.trend, path: "/analytics", meta: "Traffic patterns" },
  { id: "logs", label: "Detection Log", icon: ICONS.list, path: "/logs", meta: "Search every event" },
  { id: "alerts", label: "Alerts", icon: ICONS.alert, path: "/alerts", meta: "Priority incidents" },
];

export default function Sidebar({ logs, onLogout }) {
  const summary = buildSummary(logs);

  return (
    <aside className="sidebar-shell">
      <div className="sidebar-header">
        <div className="sidebar-chip">Security Workspace</div>

        <div className="sidebar-brand">
          <div className="sidebar-brand__mark">
            <Icon d={ICONS.camera} size={20} color="currentColor" />
          </div>
          <div>
            <p className="sidebar-brand__kicker">INTEC CCTV</p>
            <h1 className="sidebar-brand__title">Operations console</h1>
            <p className="sidebar-brand__copy">A lighter command rail for monitoring, people flow, and incident review.</p>
          </div>
        </div>
      </div>

      <section className="sidebar-highlight">
        <div className="sidebar-highlight__top">
          <div>
            <p className="eyebrow">24 hour summary</p>
            <h2>{summary.people} people tracked</h2>
          </div>
          <span className="sidebar-status">Stable</span>
        </div>

        <p className="sidebar-muted">
          {summary.unauthorized + summary.unknown} flagged detections need review, with peak activity around {summary.peakHour.label}.
        </p>

        <div className="sidebar-inline-stats">
          <div className="sidebar-inline-stat">
            <strong>{summary.total}</strong>
            <span>Detections</span>
          </div>
          <div className="sidebar-inline-stat">
            <strong>{summary.peakHour.label}</strong>
            <span>Peak hour</span>
          </div>
        </div>
      </section>

      <div className="sidebar-section-label">Navigation</div>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
          >
            <span className="nav-link__icon">
              <Icon d={item.icon} size={18} color="currentColor" />
            </span>
            <span className="nav-link__meta">
              <strong>{item.label}</strong>
              <span>{item.meta}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-note">
          <p className="eyebrow">Retention</p>
          <h2>{getRetentionWindow(logs)}</h2>
          <p className="sidebar-muted">History is kept long enough to answer hourly movement questions with context.</p>
        </div>

        <div className="profile-card">
          <div className="avatar">A</div>
          <div>
            <strong>Admin Control</strong>
            <div className="sidebar-muted">admin@intec.ac.in</div>
          </div>
        </div>

        <button className="logout-button" onClick={onLogout}>
          <Icon d={ICONS.logout} size={16} color="currentColor" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

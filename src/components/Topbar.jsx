import { useLocation } from "react-router-dom";

const PATH_META = {
  "/": {
    title: "Overview",
    copy: "A professional command view of detections, camera load, people flow, and operational risk.",
  },
  "/live": {
    title: "Live Feed",
    copy: "Monitor camera scenes, overlay detections, and track the busiest entrances in real time.",
  },
  "/analytics": {
    title: "Analytics",
    copy: "Understand hourly traffic, access quality, and how many people appeared in a selected hour window.",
  },
  "/logs": {
    title: "Detection Log",
    copy: "Search every recognition event with cleaner filters and a table built for quick review.",
  },
  "/alerts": {
    title: "Alerts",
    copy: "Review unauthorized and unknown detections with incident status, timing, and severity context.",
  },
};

export default function Topbar() {
  const { pathname } = useLocation();
  const meta = PATH_META[pathname] || {
    title: "Dashboard",
    copy: "Unified CCTV operations center.",
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar-shell">
      <div>
        <p className="topbar-kicker">INTEC CCTV / Operations Center</p>
        <h1 className="topbar-title">{meta.title}</h1>
        <p className="topbar-copy">{meta.copy}</p>
      </div>

      <div className="topbar-side">
        <div className="status-chip">
          <span className="status-dot" />
          System online
        </div>
        <div className="timestamp-card">
          <span>{formattedDate}</span>
          <strong>{now.toLocaleTimeString("en-IN")}</strong>
        </div>
      </div>
    </header>
  );
}

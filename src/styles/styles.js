export const S = {
  // Layout
  app: {
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "100vh",
    background: "#f7f6f3",
    color: "#1a1a1a",
  },
  sidebar: {
    width: 220,
    minHeight: "100vh",
    background: "#fff",
    borderRight: "1px solid #e8e5e0",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  main: {
    marginLeft: 220,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #e8e5e0",
    padding: "0 28px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  content: {
    padding: "28px 28px 48px",
    flex: 1,
  },

  // Cards
  card: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e8e5e0",
    padding: "20px 22px",
  },
  metricCard: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e8e5e0",
    padding: "18px 20px",
  },

  // Typography
  h1: {
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 16,
    fontWeight: 500,
    margin: "0 0 16px",
    color: "#1a1a1a",
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: "monospace",
    fontSize: 12,
  },

  // Buttons
  btn: {
    border: "1px solid #e8e5e0",
    background: "#fff",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#444",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },
  btnPrimary: {
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 500,
  },

  // Badge
  badge: (type) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 500,
    background:
      type === "authorized" ? "#e8f5e9"
      : type === "unauthorized" ? "#fdecea"
      : "#fff8e1",
    color:
      type === "authorized" ? "#2e7d32"
      : type === "unauthorized" ? "#c62828"
      : "#e65100",
  }),

  // Nav item
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 16px",
    borderRadius: 8,
    margin: "2px 8px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 500 : 400,
    background: active ? "#f0ede8" : "transparent",
    color: active ? "#1a1a1a" : "#666",
    transition: "background 0.15s",
    border: "none",
    width: "calc(100% - 16px)",
    textAlign: "left",
  }),

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    padding: "10px 12px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    borderBottom: "1px solid #f0ede8",
  },
  td: {
    padding: "11px 12px",
    borderBottom: "1px solid #f7f5f2",
    color: "#333",
  },

  // Progress bar
  barBg: {
    height: 6,
    borderRadius: 3,
    background: "#f0ede8",
    overflow: "hidden",
    margin: "6px 0",
  },
};
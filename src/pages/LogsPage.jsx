import { useState } from "react";
import Icon, { ICONS } from "../components/Icon";
import { S } from "../styles/styles";
import { useOutletContext } from "react-router-dom";

export default function LogsPage() {
  const { logs } = useOutletContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = logs.filter(l => {
    const matchType   = filter === "all" || l.type === filter;
    const matchSearch = !search ||
      l.roll.toLowerCase().includes(search.toLowerCase()) ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.venue.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const FILTERS = ["all", "authorized", "unauthorized", "unknown"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={S.h1}>Detection log</h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>{logs.length} total records</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ ...S.card, marginBottom: 16, padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
              <Icon d={ICONS.search} size={14} color="#aaa" />
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by roll no, name, venue..."
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "8px 12px 8px 32px",
                fontSize: 13,
                border: "1px solid #E5E7EB", borderRadius: 8,
                outline: "none", fontFamily: "inherit", color: "#2C3E50",
              }}
            />
          </div>

          {/* Type filter buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...S.btn, fontSize: 12,
                  background: filter === f ? "#0F3460" : "#fff",
                  color:      filter === f ? "#fff"    : "#4B5563",
                  border: `1px solid ${filter === f ? "#0F3460" : "#E5E7EB"}`,
                }}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "#9CA3AF" }}>{filtered.length} results</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <table style={S.table}>
          <thead>
            <tr style={{ background: "#fafaf8" }}>
              {["#", "Roll no.", "Name", "Venue", "Camera", "Confidence", "Status", "Time"].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map(log => (
              <tr key={log.id}>
                <td style={{ ...S.td, color: "#D1D5DB", fontSize: 11 }}>{log.id}</td>
                <td style={{ ...S.td, fontFamily: "monospace", fontWeight: 500, color: "#2C3E50" }}>{log.roll}</td>
                <td style={{ ...S.td, fontWeight: 500, color: "#2C3E50" }}>{log.name}</td>
                <td style={{ ...S.td, color: "#2C3E50" }}>{log.venue}</td>
                <td style={{ ...S.td, color: "#6B7280", fontSize: 12 }}>{log.camera}</td>
                <td style={S.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 4, background: "#E5E7EB", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${Math.round(parseFloat(log.confidence) * 100)}%`,
                        background: parseFloat(log.confidence) > 0.7 ? "#10B981" : "#DC2626",
                        borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{log.confidence}</span>
                  </div>
                </td>
                <td style={S.td}><span style={S.badge(log.type)}>{log.type}</span></td>
                <td style={{ ...S.td, fontFamily: "monospace", color: "#9CA3AF", fontSize: 12 }}>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
export const VENUES = [
  { id: "A", name: "Main Gate", camera: "CAM-01", location: "Block A", authorized: 312, unauthorized: 18, unknown: 7 },
  { id: "B", name: "Library",   camera: "CAM-02", location: "Block B", authorized: 189, unauthorized: 9,  unknown: 4 },
  { id: "C", name: "Lab Block", camera: "CAM-03", location: "Block C", authorized: 254, unauthorized: 22, unknown: 11 },
  { id: "D", name: "Cafeteria", camera: "CAM-04", location: "Block D", authorized: 421, unauthorized: 31, unknown: 8 },
];

export const NAMES = [
  "Afeef M", "Rahul K", "Priya S", "Mohammed A", "Divya R", "Karthik B",
  "Sneha T", "Arjun N", "Lakshmi P", "Vishnu C", "Meera J", "Arun V",
];

export const ROLL_PREFIXES = ["21CS", "22EC", "20ME", "23CE", "21IT", "22EE"];

export const HOURLY_BASE = [12,8,5,3,2,4,15,42,68,75,82,78,71,65,58,55,60,72,68,55,40,30,22,15];

export function genRoll() {
  return ROLL_PREFIXES[Math.floor(Math.random() * ROLL_PREFIXES.length)] +
    String(Math.floor(Math.random() * 90 + 10)).padStart(3, "0");
}

export function genLogs(count = 40) {
  const logs = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const venue = VENUES[Math.floor(Math.random() * VENUES.length)];
    const type = Math.random() < 0.85 ? "authorized" : Math.random() < 0.6 ? "unauthorized" : "unknown";
    logs.push({
      id: count - i,
      roll: type === "unknown" ? "UNKNOWN" : genRoll(),
      name: type === "unknown" ? "Unknown" : NAMES[Math.floor(Math.random() * NAMES.length)],
      venue: venue.name,
      camera: venue.camera,
      confidence: type === "unknown"
        ? (Math.random() * 0.3 + 0.1).toFixed(2)
        : (Math.random() * 0.2 + 0.79).toFixed(2),
      type,
      time: new Date(now - i * 1000 * (Math.random() * 120 + 30)).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }),
      ts: now - i * 1000 * (Math.random() * 120 + 30),
    });
  }
  return logs.sort((a, b) => b.ts - a.ts);
}

export function genNewLog() {
  const venue = VENUES[Math.floor(Math.random() * VENUES.length)];
  const type = Math.random() < 0.85 ? "authorized" : Math.random() < 0.6 ? "unauthorized" : "unknown";
  return {
    id: Date.now(),
    roll: type === "unknown" ? "UNKNOWN" : genRoll(),
    name: type === "unknown" ? "Unknown" : NAMES[Math.floor(Math.random() * NAMES.length)],
    venue: venue.name,
    camera: venue.camera,
    confidence: type === "unknown"
      ? (Math.random() * 0.3 + 0.1).toFixed(2)
      : (Math.random() * 0.2 + 0.79).toFixed(2),
    type,
    time: new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }),
    ts: Date.now(),
  };
}
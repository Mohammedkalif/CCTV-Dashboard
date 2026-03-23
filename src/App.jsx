import { useState, useEffect } from "react";
import Login     from "./components/Login";
import Dashboard from "./components/Dashboard";
import { genLogs, genNewLog } from "./data/mockData.js";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page,     setPage]     = useState("dashboard");
  const [logs,     setLogs]     = useState(() => genLogs(40));

  // Simulate live detections every 4 seconds after login
  useEffect(() => {
    if (!loggedIn) return;
    const t = setInterval(() => {
      setLogs(prev => [genNewLog(), ...prev].slice(0, 100));
    }, 4000);
    return () => clearInterval(t);
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Login onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <Dashboard
        page={page}
        setPage={setPage}
        logs={logs}
        onLogout={() => { setLoggedIn(false); setPage("dashboard"); }}
      />
    </>
  );
}
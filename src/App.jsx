import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { genLogs, genNewLog } from "./data/mockData.js";

import OverviewPage from "./pages/OverviewPage";
import LiveFeedPage from "./pages/LiveFeedPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LogsPage from "./pages/LogsPage";
import AlertsPage from "./pages/AlertsPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logs, setLogs] = useState(() => genLogs(40));
  const navigate = useNavigate();

  // Simulate live detections every 4 seconds after login
  useEffect(() => {
    if (!loggedIn) return;
    const t = setInterval(() => {
      setLogs(prev => [genNewLog(), ...prev].slice(0, 100));
    }, 4000);
    return () => clearInterval(t);
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <Routes>
        <Route
          path="/login"
          element={
            loggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Dashboard logs={logs} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<OverviewPage logs={logs} />} />
          <Route path="live" element={<LiveFeedPage logs={logs} />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="logs" element={<LogsPage logs={logs} />} />
          <Route path="alerts" element={<AlertsPage logs={logs} />} />
        </Route>
        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
}
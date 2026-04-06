import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { S } from "../styles/styles";

export default function Dashboard({ logs, onLogout }) {
  return (
    <div style={S.app}>
      <Sidebar onLogout={onLogout} />
      <div style={S.main}>
        <Topbar />
        <div style={S.content}>
          <Outlet context={{ logs }} />
        </div>
      </div>
    </div>
  );
}
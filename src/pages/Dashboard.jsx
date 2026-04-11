import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import API from "../api/axios";
import "../Style/Dashboard.css";

export default function Dashboard() {
  const [counts, setCounts] = useState({ projects: 0, services: 0, success: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s, t] = await Promise.allSettled([
          API.get("/projects"),
          API.get("/services"),
          API.get("/testimonials"),
        ]);
        setCounts({
          projects: p.status === "fulfilled"
            ? (Array.isArray(p.value.data) ? p.value.data : p.value.data.projects || []).length : 0,
          services: s.status === "fulfilled"
            ? (Array.isArray(s.value.data) ? s.value.data : s.value.data.services || []).length : 0,
          success: t.status === "fulfilled"
            ? (Array.isArray(t.value.data) ? t.value.data : t.value.data.testimonials || []).length : 0,
        });
      } catch {}
    };
    load();
  }, []);

  return (
    <>
      <Toast />
      <div className="layout">
        <Sidebar />
        <main className="main">
          <div className="page-header">
            <div>
              <div className="page-title">Dashboard</div>
              <div className="page-sub">Welcome back, Admin</div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-num">{counts.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{counts.services}</div>
              <div className="stat-label">Services</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{counts.success}</div>
              <div className="stat-label">Success Stories</div>
            </div>
          </div>

          <div className="dash-hint">
            Use the sidebar to manage your content. All changes are saved to your backend.
          </div>
        </main>
      </div>
    </>
  );
}
import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Toast, { toast } from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";
import API from "../api/axios";
import "../Style/Contacts.css";

export default function Contacts() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [confirm, setConfirm]   = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/contacts");
      setItems(Array.isArray(data) ? data : data.contacts || []);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      toast.success("Contact deleted");
      setConfirm(null);
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <>
      <Toast />
      <div className="layout">
        <Sidebar />
        <main className="main">

          <div className="page-header">
            <div>
              <div className="page-title">Contact Messages</div>
              <div className="page-sub">{items.length} messages</div>
            </div>
          </div>

          {loading ? (
            <div className="loading-wrap"><span className="spinner" /></div>
          ) : items.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✉</div>
              <div className="empty-text">No messages yet.</div>
            </div>
          ) : (
            <div className="contacts-grid">
              {items.map((item) => (
                <div className="contact-card" key={item._id}>

                  <div className="testimonial-header">
                    <div className="testimonial-avatar-placeholder">
                      {item.fullName?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="testimonial-meta">
                      <div className="testimonial-name">{item.fullName}</div>
                      <div className="testimonial-role">{item.email}</div>
                    </div>
                    <div className="contact-date">{fmt(item.createdAt)}</div>
                  </div>

                  {item.reasons?.length > 0 && (
                    <div className="contact-reasons">
                      {item.reasons.map((r, i) => (
                        <span className="contact-tag" key={i}>{r}</span>
                      ))}
                    </div>
                  )}

                  <div
                    className={`contact-message ${expanded === item._id ? "expanded" : ""}`}
                    onClick={() => setExpanded(expanded === item._id ? null : item._id)}
                  >
                    {item.message}
                  </div>

                  {item.message?.length > 120 && (
                    <button
                      className="contact-expand-btn"
                      onClick={() => setExpanded(expanded === item._id ? null : item._id)}
                    >
                      {expanded === item._id ? "Show less" : "Read more"}
                    </button>
                  )}

                  <div className="card-actions">
                    <button className="btn-del" onClick={() => setConfirm(item._id)}>
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {confirm && (
        <ConfirmDialog
          msg="This message will be permanently deleted."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}
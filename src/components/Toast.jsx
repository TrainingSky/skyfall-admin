import { useState, useEffect } from "react";
import "./compoStyle/Toast.css";

let _addToast = () => {};

export const toast = {
  success: (msg) => _addToast({ type: "success", msg }),
  error:   (msg) => _addToast({ type: "error",   msg }),
  info:    (msg) => _addToast({ type: "info",     msg }),
};

export default function Toast() {
  const [list, setList] = useState([]);

  useEffect(() => {
    _addToast = (t) => {
      const id = Date.now();
      setList((p) => [...p, { ...t, id }]);
      setTimeout(() => setList((p) => p.filter((x) => x.id !== id)), 3500);
    };
  }, []);

  const icons = { success: "✓", error: "✕", info: "i" };

  return (
    <div className="toasts">
      {list.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast__icon">{icons[t.type]}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
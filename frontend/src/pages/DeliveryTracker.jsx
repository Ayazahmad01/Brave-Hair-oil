import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function DeliveryTracker() {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/recent").then((res) => setRecent(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ marginTop: 40, maxWidth: 700 }}>
      <h1>Delivery & Recent Orders</h1>

      <div className="card" style={{ marginTop: 16, background: "var(--forest)", color: "var(--ivory)" }}>
        <p className="eyebrow" style={{ color: "var(--amber-light)" }}>Estimated delivery time</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", margin: 0 }}>
          2 - 3 business days
        </p>
        <p style={{ color: "#d8dfd9", fontSize: "0.9rem", marginTop: 6 }}>
          Delivery time may vary slightly by city. You'll be contacted on WhatsApp to confirm.
        </p>
      </div>

      <h2 style={{ marginTop: 30 }}>People who recently ordered</h2>
      {loading && <p>Loading...</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        {recent.map((o, idx) => (
          <div key={idx} className="card" style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px" }}>
            <div>
              <strong>{o.itemSummary}</strong>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{o.city}</div>
            </div>
            <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
              {new Date(o.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
        {!loading && recent.length === 0 && (
          <p style={{ color: "var(--muted)" }}>No orders yet — be the first!</p>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  const downloadInvoice = async (id) => {
    const res = await api.get(`/orders/${id}/invoice`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) return <div className="container" style={{ marginTop: 60 }}>Loading your orders...</div>;

  return (
    <div className="container" style={{ marginTop: 40, maxWidth: 700 }}>
      <h1>My Orders</h1>
      {orders.length === 0 && <p style={{ color: "var(--muted)" }}>You haven't placed any orders yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
        {orders.map((o) => (
          <div key={o._id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{new Date(o.createdAt).toLocaleDateString()}</strong>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Status: {o.status}</div>
              </div>
              <span style={{ fontFamily: "var(--font-display)", color: "var(--clay)" }}>Rs. {o.totalAmount}</span>
            </div>
            <ul style={{ margin: "10px 0", paddingLeft: 18, color: "var(--muted)", fontSize: "0.9rem" }}>
              {o.items.map((i, idx) => (
                <li key={idx}>{i.productName} ({i.size}) x{i.quantity}</li>
              ))}
            </ul>
            <button className="btn btn-outline" onClick={() => downloadInvoice(o._id)}>Download Invoice</button>
          </div>
        ))}
      </div>
    </div>
  );
}

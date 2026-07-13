import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/orders", { items, ...form });
      setPlacedOrderId(data._id);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not place your order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async () => {
    const res = await api.get(`/orders/${placedOrderId}/invoice`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${placedOrderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (placedOrderId) {
    return (
      <div className="container" style={{ marginTop: 60, maxWidth: 480, textAlign: "center" }}>
        <div className="card">
          <h1>Order placed! 🎉</h1>
          <p style={{ color: "var(--muted)" }}>
            Thanks — we've received your order and will reach out on WhatsApp to confirm delivery.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
            <button className="btn btn-amber" onClick={downloadInvoice}>Download Invoice / Bill</button>
            <button className="btn btn-outline" onClick={() => navigate("/history")}>View My Orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 40, maxWidth: 520 }}>
      <h1>Checkout</h1>
      <p style={{ color: "var(--muted)" }}>Total: <strong style={{ color: "var(--clay)" }}>Rs. {total}</strong></p>
      <form className="card" style={{ marginTop: 16 }} onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Full name</label>
          <input required value={form.customerName} onChange={update("customerName")} />
        </div>
        <div className="form-field">
          <label>Phone number</label>
          <input required value={form.phone} onChange={update("phone")} />
        </div>
        <div className="form-field">
          <label>Delivery address</label>
          <textarea required rows={3} value={form.address} onChange={update("address")} />
        </div>
        <div className="form-field">
          <label>City</label>
          <input required value={form.city} onChange={update("city")} />
        </div>
        <div className="form-field">
          <label>Notes (optional)</label>
          <input value={form.notes} onChange={update("notes")} placeholder="e.g. preferred delivery time" />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

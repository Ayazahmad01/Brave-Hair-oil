import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container" style={{ marginTop: 60, textAlign: "center" }}>
        <h1>Your cart is empty</h1>
        <p style={{ color: "var(--muted)" }}>Add some oil or shampoo from the shop first.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 40, maxWidth: 640 }}>
      <h1>Your Cart</h1>
      <div className="card" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((i) => (
          <div key={i.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
            <div>
              <strong>{i.productName}</strong>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{i.size} · Rs. {i.price} each</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="number" min={1} value={i.quantity}
                onChange={(e) => updateQuantity(i.key, Number(e.target.value))}
                style={{ width: 50, padding: 6, borderRadius: 8, border: "1px solid var(--border)" }}
              />
              <span style={{ width: 70, textAlign: "right", fontWeight: 600 }}>Rs. {i.price * i.quantity}</span>
              <button onClick={() => removeFromCart(i.key)} className="btn btn-outline" style={{ padding: "6px 12px" }}>✕</button>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>
          <span>Total</span>
          <span style={{ color: "var(--clay)" }}>Rs. {total}</span>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

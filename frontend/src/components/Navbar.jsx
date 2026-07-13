import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--cream-card)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <Link to="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--forest)" }}>
          Brave <span style={{ color: "var(--amber)" }}>Hair Oil</span>
        </Link>

        {user ? (
          <nav style={{ display: "flex", alignItems: "center", gap: 20, fontSize: "0.92rem", fontWeight: 500 }}>
            <Link to="/">Shop</Link>
            <Link to="/delivery">Delivery & Orders</Link>
            <Link to="/history">My Orders</Link>
            <Link to="/spin">🎡 Spin & Win</Link>
            {user.isAdmin && (
              <Link to="/admin" style={{ color: "var(--clay)", fontWeight: 700 }}>Admin</Link>
            )}
            <Link to="/cart" style={{ position: "relative" }}>
              Cart{cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -10, right: -16, background: "var(--clay)",
                  color: "#fff", borderRadius: "50%", fontSize: "0.7rem", width: 18, height: 18,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{cartCount}</span>
              )}
            </Link>
            <button
              className="btn btn-outline"
              style={{ padding: "8px 16px" }}
              onClick={() => { logout(); navigate("/login"); }}
            >
              Log out
            </button>
          </nav>
        ) : (
          <nav style={{ display: "flex", gap: 12 }}>
            <Link to="/login" className="btn btn-outline">Log in</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

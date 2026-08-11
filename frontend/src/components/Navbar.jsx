import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <header className="bh-navbar">
      <div className="bh-navbar-inner">

        {/* Brand */}
        <Link to="/" className="bh-brand" onClick={() => setMobileOpen(false)}>
          <div className="bh-brand-icon">🌿</div>

          <div className="bh-brand-text">
            <span className="bh-brand-main">Brave</span>
            <span className="bh-brand-sub">Hair Oil</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {user ? (
          <nav className="bh-desktop-nav">

            <Link
              to="/"
              className={`bh-nav-link ${isActive("/") ? "active" : ""}`}
            >
              Shop
            </Link>

            <Link
              to="/delivery"
              className={`bh-nav-link ${
                isActive("/delivery") ? "active" : ""
              }`}
            >
              Delivery & Orders
            </Link>

            <Link
              to="/history"
              className={`bh-nav-link ${
                isActive("/history") ? "active" : ""
              }`}
            >
              My Orders
            </Link>

            <Link
              to="/spin"
              className={`bh-nav-link ${
                isActive("/spin") ? "active" : ""
              }`}
            >
              <span className="bh-spin-icon">🎡</span>
              Spin & Win
            </Link>

            {user.isAdmin && (
              <Link
                to="/admin"
                className={`bh-nav-link bh-admin ${
                  isActive("/admin") ? "active" : ""
                }`}
              >
                Admin
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className={`bh-cart ${
                isActive("/cart") ? "active" : ""
              }`}
              aria-label="Shopping cart"
            >
              <span className="bh-cart-icon">🛒</span>
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="bh-cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              className="bh-logout"
              onClick={handleLogout}
            >
              <span>↪</span>
              Log out
            </button>
          </nav>
        ) : (
          <nav className="bh-auth-nav">
            <Link to="/login" className="bh-login-btn">
              Log in
            </Link>

            <Link to="/signup" className="bh-signup-btn">
              Sign up
              <span>→</span>
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <button
          className="bh-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="bh-mobile-menu">

          {user ? (
            <>
              <Link
                to="/"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                🌿 Shop
              </Link>

              <Link
                to="/delivery"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                📦 Delivery & Orders
              </Link>

              <Link
                to="/history"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                📋 My Orders
              </Link>

              <Link
                to="/spin"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                🎡 Spin & Win
              </Link>

              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="bh-mobile-link bh-admin"
                  onClick={() => setMobileOpen(false)}
                >
                  ⚙️ Admin
                </Link>
              )}

              <Link
                to="/cart"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                🛒 Cart

                {cartCount > 0 && (
                  <span className="bh-mobile-cart-count">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                className="bh-mobile-logout"
                onClick={handleLogout}
              >
                ↪ Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bh-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="bh-mobile-signup"
                onClick={() => setMobileOpen(false)}
              >
                Sign up →
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
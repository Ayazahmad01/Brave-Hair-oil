import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
        ]);

        setProducts(productsRes.data || []);
        setOrders(ordersRes.data || []);
      } catch (error) {
        console.error("Admin data error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: "50px 24px" }}>
        <h1>Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        padding: "40px 24px",
        marginBottom: 60,
      }}
    >
      <p className="eyebrow">Management Panel</p>

      <h1 style={{ fontSize: "2.4rem", marginBottom: 8 }}>
        Admin Dashboard
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 35 }}>
        Manage Brave Hair Oil products and orders.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div className="card" style={{ padding: 24 }}>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Total Products
          </p>
          <h2 style={{ fontSize: "2rem" }}>{products.length}</h2>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Total Orders
          </p>
          <h2 style={{ fontSize: "2rem" }}>{orders.length}</h2>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Admin Status
          </p>
          <h2 style={{ fontSize: "1.5rem" }}>Active ✓</h2>
        </div>
      </div>

      {/* Products */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 20 }}>Products</h2>

        {products.length === 0 ? (
          <div className="card" style={{ padding: 24 }}>
            No products found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="card"
                style={{ padding: 20 }}
              >
                <h3 style={{ marginBottom: 10 }}>
                  {product.name}
                </h3>

                {product.description && (
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                      marginBottom: 12,
                    }}
                  >
                    {product.description}
                  </p>
                )}

                {product.price !== undefined && (
                  <strong>
                    Rs. {product.price}
                  </strong>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Orders */}
      <section>
        <h2 style={{ marginBottom: 20 }}>Recent Orders</h2>

        {orders.length === 0 ? (
          <div className="card" style={{ padding: 24 }}>
            No orders found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 15,
            }}
          >
            {orders.slice(0, 10).map((order) => (
              <div
                key={order._id}
                className="card"
                style={{
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong>
                    Order #{order._id?.slice(-6)}
                  </strong>

                  <p
                    style={{
                      color: "var(--muted)",
                      marginTop: 5,
                    }}
                  >
                    {order.status || "Pending"}
                  </p>
                </div>

                {order.total !== undefined && (
                  <strong>
                    Rs. {order.total}
                  </strong>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
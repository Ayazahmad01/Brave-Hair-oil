import { useEffect, useState } from "react";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Could not load products. Is the backend running and seeded?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ marginTop: 40, marginBottom: 60 }}>
      <p className="eyebrow">Naturally strong, naturally you</p>
      <h1 style={{ fontSize: "2.4rem" }}>Brave Hair Oil</h1>
      <p style={{ color: "var(--muted)", maxWidth: 520 }}>
        Herbal oil and shampoo crafted to strengthen your hair from root to tip.
        Pick a size and add it to your cart to get started.
      </p>

      {loading && <p style={{ marginTop: 30 }}>Loading products...</p>}
      {error && <p className="error-text" style={{ marginTop: 30 }}>{error}</p>}

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 22, marginTop: 34
      }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

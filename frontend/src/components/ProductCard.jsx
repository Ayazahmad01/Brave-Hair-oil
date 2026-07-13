import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      
      <div style={{ height: 160, borderRadius: 12, overflow: "hidden", background: "var(--forest)" }}>
        <img
          src={product.category === "oil" ? "/public/oil.jpg" : "/public/shampo.jpg"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: 4 }}>{product.name}</h3>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0 }}>{product.description}</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {product.sizes.map((s) => (
          <button
            key={s.label}
            onClick={() => setSelectedSize(s)}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 10, cursor: "pointer",
              border: selectedSize.label === s.label ? "2px solid var(--forest)" : "1px solid var(--border)",
              background: selectedSize.label === s.label ? "var(--ivory)" : "#fff",
              fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)"
            }}
          >
            {s.label}<br /><span style={{ fontWeight: 400, color: "var(--muted)" }}>{s.ml}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--clay)" }}>
          Rs. {selectedSize.price}
        </span>
        <button className="btn btn-amber" onClick={handleAdd}>
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

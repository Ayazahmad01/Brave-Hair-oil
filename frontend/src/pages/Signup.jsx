import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form.name, form.email, form.phone, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 60 }}>
      <p className="eyebrow">Join us</p>
      <h1>Create your account</h1>
      <form className="card" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Full name</label>
          <input required value={form.name} onChange={update("name")} />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input type="email" required value={form.email} onChange={update("email")} />
        </div>
        <div className="form-field">
          <label>Phone (WhatsApp preferred)</label>
          <input required value={form.phone} onChange={update("phone")} placeholder="03xx-xxxxxxx" />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" required minLength={6} value={form.password} onChange={update("password")} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: "0.9rem" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--clay)", fontWeight: 600 }}>Log in</Link>
      </p>
    </div>
  );
}

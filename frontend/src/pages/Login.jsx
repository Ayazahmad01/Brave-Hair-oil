import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 60 }}>
      <p className="eyebrow">Welcome back</p>
      <h1>Log in to Brave Hair Oil</h1>
      <form className="card" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: "0.9rem" }}>
        New here? <Link to="/signup" style={{ color: "var(--clay)", fontWeight: 600 }}>Create an account</Link>
      </p>
    </div>
  );
}

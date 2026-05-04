import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setToken } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.register(email, password);
      setToken(data.token);
      navigate("/assessment", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Register</h1>
            <div className="muted">Create an account to start your assessment and save prediction history.</div>
          </div>
          <span className="pill">Database storage enabled</span>
        </div>

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Minimum 6 characters"
          />

          <div className="btnRow">
            <button className="btn" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
            <Link className="btn btnGhost" to="/login">
              Back to login
            </Link>
          </div>

          {error ? <div className="error">{error}</div> : null}
        </form>
      </div>

      <div className="card">
        <h2 className="h2">What happens next?</h2>
        <div className="muted">After registration you can start the assessment by clicking the Start button.</div>
        <div className="divider" />
        <ul className="muted" style={{ marginTop: 0, lineHeight: 1.7 }}>
          <li>Enter age, weight, height, blood group, cycle length.</li>
          <li>BMI is calculated automatically.</li>
          <li>Answer yes/no questions about symptoms and lifestyle.</li>
          <li>Get a positive/negative risk result and recommendation.</li>
          <li>Your history is saved securely in the database.</li>
        </ul>
      </div>
    </div>
  );
}


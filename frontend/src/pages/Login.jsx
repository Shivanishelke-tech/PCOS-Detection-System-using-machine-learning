import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api, setToken } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/assessment";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Login</h1>
            <div className="muted">Access your PCOS assessment, diet planner, exercise tracker, and chatbot.</div>
          </div>
          <span className="pill">Secure token login</span>
        </div>

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
          />

          <div className="btnRow">
            <button className="btn" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            <Link className="btn btnGhost" to="/register">
              Create account
            </Link>
          </div>

          {error ? <div className="error">{error}</div> : null}
        </form>
      </div>

      <div className="card">
        <div className="cardHeader">
          <div>
            <h2 className="h2">How we can help you</h2>
            <div className="muted">PCOS detection related interface and support.</div>
          </div>
          <span className="pill">Guidance</span>
        </div>

        <div className="kpi">
          <div className="kpiBox">
            <div className="kpiLabel">Assessment</div>
            <div className="kpiValue">BMI + Symptoms</div>
            <div className="muted">Answer quick inputs to screen PCOS risk.</div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Diet Planner</div>
            <div className="kpiValue">Veg / Non-Veg</div>
            <div className="muted">High protein + fiber meal options + avoid list.</div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Support</div>
            <div className="kpiValue">Chatbot</div>
            <div className="muted">Ask PCOS questions and get safe guidance.</div>
          </div>
        </div>

        <div className="divider" />
        <div className="muted">
          If your assessment is positive risk, we will recommend consulting a doctor for further enquiries and confirmed
          diagnosis.
        </div>
      </div>
    </div>
  );
}


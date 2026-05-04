import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function History() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function load() {
      setError("");
      setLoading(true);
      try {
        const data = await api.history();
        if (alive) setRows(data.history || []);
      } catch (err) {
        if (alive) setError(err.message || "Failed to load history");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h1 className="h1">Prediction History</h1>
          <div className="muted">Stored in SQLite (per user).</div>
        </div>
        <Link className="btn btnGhost" to="/assessment">
          New Assessment
        </Link>
      </div>

      {loading ? <div className="muted">Loading...</div> : null}
      {error ? <div className="error">{error}</div> : null}

      {!loading && !error && rows.length === 0 ? (
        <div className="muted">No assessments yet.</div>
      ) : null}

      {!loading && rows.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Prediction</th>
                <th>BMI</th>
                <th>Score</th>
                <th>Cycle</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.created_at}</td>
                  <td style={{ fontWeight: 900 }}>{String(r.prediction).toUpperCase()}</td>
                  <td>{r.bmi}</td>
                  <td>{r.score}</td>
                  <td>{r.cycle_length_days} days</td>
                  <td>{r.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}


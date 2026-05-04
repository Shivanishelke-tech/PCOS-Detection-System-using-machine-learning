import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Result() {
  const result = useMemo(() => {
    const raw = sessionStorage.getItem("pcos_last_result");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  if (!result) {
    return (
      <div className="card">
        <h1 className="h1">Result</h1>
        <div className="muted">No recent assessment found.</div>
        <div className="btnRow">
          <Link className="btn" to="/assessment">
            Start Assessment
          </Link>
          <Link className="btn btnGhost" to="/history">
            View History
          </Link>
        </div>
      </div>
    );
  }

  const positive = result.prediction === "positive" || result.prediction === "PCOS Detected";

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Prediction Result</h1>
            <div className="muted">Saved to your database history automatically.</div>
          </div>
          <span className="pill">{result.prediction || (positive ? "Positive" : "Negative")}</span>
        </div>

        <div className={positive ? "error" : "ok"} style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>
            {positive ? "PCOS risk: Positive" : "PCOS risk: Negative"}
          </div>
          <div>{result.recommendation}</div>
        </div>

        <div className="divider" />
        <div className="kpi">
          <div className="kpiBox">
            <div className="kpiLabel">BMI</div>
            <div className="kpiValue">{result.bmi}</div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Score</div>
            <div className="kpiValue">{result.score}</div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Assessment ID</div>
            <div className="kpiValue">{result.assessment_id}</div>
          </div>
        </div>

        <div className="btnRow">
          <Link className="btn" to="/assessment">
            New Assessment
          </Link>
          <Link className="btn btnGhost" to="/diet">
            Diet Planner
          </Link>
          <Link className="btn btnGhost" to="/exercise">
            Exercise Tracker
          </Link>
          <Link className="btn btnGhost" to="/chatbot">
            Ask Chatbot
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="h2">What to do next</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          - If positive risk: consult a doctor/gynecologist for further enquiries and confirmed diagnosis.
          <br />- Focus on high protein + fiber meals.
          <br />- Exercise daily (walking/yoga) and add strength training.
          <br />- Sleep 7–9 hours (adults).
        </div>
        <div className="divider" />
        <Link className="btn btnGhost" to="/history">
          View saved history
        </Link>
      </div>
    </div>
  );
}


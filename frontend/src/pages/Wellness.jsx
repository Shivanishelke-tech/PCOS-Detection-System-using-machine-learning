import React, { useState } from "react";

function MinutesBetween(start, end) {
  if (!start || !end) return null;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if ([sh, sm, eh, em].some((v) => Number.isNaN(v))) return null;
  let startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin <= startMin) {
    endMin += 24 * 60;
  }
  return endMin - startMin;
}

export default function Wellness() {
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDuration, setPeriodDuration] = useState("5");

  const sleepMinutes = MinutesBetween(sleepStart, sleepEnd);
  const sleepHours = sleepMinutes != null ? (sleepMinutes / 60).toFixed(1) : null;
  const sleepInRange =
    sleepHours != null && Number(sleepHours) >= 7 && Number(sleepHours) <= 9;

  let autoSleepQuality = "";
  if (sleepHours != null) {
    const h = Number(sleepHours);
    if (h >= 7 && h <= 9) {
      autoSleepQuality = "good";
    } else if ((h >= 6 && h < 7) || (h > 9 && h <= 10)) {
      autoSleepQuality = "average";
    } else {
      autoSleepQuality = "poor";
    }
  }

  let nextPeriodText = "";
  let cycleFeedback = "";
  if (lastPeriodDate && cycleLength) {
    const base = new Date(lastPeriodDate);
    if (!Number.isNaN(base.getTime())) {
      const len = Number(cycleLength);
      const next = new Date(base);
      next.setDate(next.getDate() + (Number.isNaN(len) ? 28 : len));
      nextPeriodText = next.toLocaleDateString();
      if (!Number.isNaN(len)) {
        if (len > 35) {
          cycleFeedback =
            "Cycle length appears longer than average. Consider consulting a doctor if this continues.";
        } else {
          cycleFeedback = "Your cycle appears regular. Keep tracking monthly.";
        }
      }
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Sleep Tracker</h1>
            <div className="muted">Gentle routines to support hormones.</div>
          </div>
          <span className="pill">7–9 hrs goal</span>
        </div>

        <h2 className="h2" style={{ fontSize: 16, marginBottom: 4 }}>
          🛌 Daily Sleep Check-in
        </h2>
        <div className="muted" style={{ marginBottom: 6 }}>
          Answer these simple questions each night or morning.
        </div>

        <label>⏰ What time did you sleep?</label>
        <input
          type="time"
          value={sleepStart}
          onChange={(e) => setSleepStart(e.target.value)}
        />

        <label>⏰ What time did you wake up?</label>
        <input
          type="time"
          value={sleepEnd}
          onChange={(e) => setSleepEnd(e.target.value)}
        />

        <label>🌙 Sleep Quality</label>
        <select value={autoSleepQuality} disabled>
          <option value="">Auto based on hours</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>

        <div className="divider" />
        {sleepHours ? (
          <div className={sleepInRange ? "ok" : "error"}>
            <div>Estimated sleep: {sleepHours} hrs.</div>
            <div style={{ marginTop: 4 }}>
              {sleepInRange
                ? "Great — you are within the recommended range."
                : "Try to move closer to 7–9 hours regularly."}
            </div>
          </div>
        ) : (
          <div className="muted">Enter your sleep and wake times to get feedback.</div>
        )}
      </div>

      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Menstrual Tracker</h1>
            <div className="muted">Simple cycle tracking for PCOS/PCOD.</div>
          </div>
          <span className="pill">Track monthly</span>
        </div>

        <h2 className="h2" style={{ fontSize: 16, marginBottom: 4 }}>
          🩸 Cycle Details
        </h2>

        <label>🗓 Last Period Start Date</label>
        <input
          type="date"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
        />

        <label>🔄 Cycle Length (days)</label>
        <input
          type="number"
          min="21"
          max="60"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        />

        <label>🩸 Period Duration (3–7 days)</label>
        <input
          type="number"
          min="3"
          max="7"
          value={periodDuration}
          onChange={(e) => setPeriodDuration(e.target.value)}
        />

        <div className="divider" />
        {nextPeriodText ? (
          <div className="ok">
            <div>Next expected period: {nextPeriodText}</div>
            {cycleFeedback && (
              <div style={{ marginTop: 4 }}>
                {cycleFeedback}
              </div>
            )}
          </div>
        ) : (
          <div className="muted">
            Fill in your last period date and cycle length to see the next expected period.
          </div>
        )}
      </div>
    </div>
  );
}


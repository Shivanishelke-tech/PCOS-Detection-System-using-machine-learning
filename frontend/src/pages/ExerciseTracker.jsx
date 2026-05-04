import React, { useState } from "react";

const ROUTINES = {
  morning: [
    {
      name: "Brisk Walking",
      icon: "🚶‍♀️",
      how: "Walk at a fast pace for 10–15 minutes, keeping shoulders relaxed."
    },
    {
      name: "Spot Jogging",
      icon: "🏃‍♀️",
      how: "Jog in place, lifting knees softly and landing light on your feet."
    },
    {
      name: "Jumping Jacks",
      icon: "⭐",
      how: "Jump feet out and in while raising arms overhead for 20–30 reps."
    }
  ],
  yoga: [
    {
      name: "Surya Namaskar",
      icon: "🌞",
      how: "Flow through the 12-step sequence slowly with deep breathing (3–5 rounds)."
    },
    {
      name: "Bhujangasana (Cobra)",
      icon: "🐍",
      how: "Lie on your belly and gently lift your chest, keeping elbows slightly bent."
    },
    {
      name: "Baddha Konasana (Butterfly)",
      icon: "🦋",
      how: "Sit with feet together, gently move knees up and down while keeping back tall."
    }
  ],
  home: [
    {
      name: "Squats",
      icon: "🦵",
      how: "Sit back as if on a chair, knees in line with toes, chest open."
    },
    {
      name: "Glute Bridges",
      icon: "🛏️",
      how: "Lie on your back, lift hips up, squeeze glutes, and lower slowly."
    },
    {
      name: "Wall / Knee Push-ups",
      icon: "💪",
      how: "Keep body in a straight line and bend elbows slowly toward the wall/floor."
    }
  ]
};

export default function ExerciseTracker() {
  const [done, setDone] = useState({});

  function toggle(key) {
    setDone((d) => ({ ...d, [key]: !d[key] }));
  }

  const total = Object.keys(done).length;
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">Exercise Tracker</h1>
            <div className="muted">Daily routines to support PCOS/PCOD.</div>
          </div>
          <span className="pill">10–20 mins / day</span>
        </div>

        <div className="kpi">
          <div className="kpiBox">
            <div className="kpiLabel">Completed</div>
            <div className="kpiValue">
              {completed}/{Math.max(total, 1)}
            </div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Goal</div>
            <div className="kpiValue">Consistency</div>
          </div>
          <div className="kpiBox">
            <div className="kpiLabel">Sleep (adults)</div>
            <div className="kpiValue">7–9 hrs</div>
          </div>
        </div>

        <div className="divider" />
        <h2 className="h2">Daily Morning Exercises (10–20 mins)</h2>
        <div className="divider" />
        {ROUTINES.morning.map((item) => {
          const key = `morning:${item.name}`;
          return (
            <div
              key={key}
              className="chatBubble user"
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <input
                type="checkbox"
                checked={Boolean(done[key])}
                onChange={() => toggle(key)}
                style={{ width: 18, marginTop: 2 }}
              />
              <div>
                <div>
                  {item.icon} {item.name}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {item.how}
                </div>
              </div>
            </div>
          );
        })}

        <div className="divider" />
        <h2 className="h2">Yoga for Daily Routine (PCOD-Friendly)</h2>
        <img
          src="/images/exercises.png"
          alt="Surya Namaskar, Bhujangasana and Baddha Konasana yoga poses"
          className="exerciseImage"
        />
        <div className="divider" />
        {ROUTINES.yoga.map((item) => {
          const key = `yoga:${item.name}`;
          return (
            <div
              key={key}
              className="chatBubble user"
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <input
                type="checkbox"
                checked={Boolean(done[key])}
                onChange={() => toggle(key)}
                style={{ width: 18, marginTop: 2 }}
              />
              <div>
                <div>
                  {item.icon} {item.name}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {item.how}
                </div>
              </div>
            </div>
          );
        })}

        <div className="divider" />
        <h2 className="h2">Home Workout (No Equipment)</h2>
        <img
          src="/images/exercises.png"
          alt="Squats, glute bridges and wall or knee push-ups demonstration"
          className="exerciseImage"
        />
        <div className="divider" />
        {ROUTINES.home.map((item) => {
          const key = `home:${item.name}`;
          return (
            <div
              key={key}
              className="chatBubble user"
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <input
                type="checkbox"
                checked={Boolean(done[key])}
                onChange={() => toggle(key)}
                style={{ width: 18, marginTop: 2 }}
              />
              <div>
                <div>
                  {item.icon} {item.name}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {item.how}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


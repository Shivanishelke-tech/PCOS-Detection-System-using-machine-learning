import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function calcBmi(weightKg, heightCm) {
  const w = Number(weightKg);
  const h = Number(heightCm) / 100;
  if (!w || !h) return "";
  const bmi = w / (h * h);
  return Number.isFinite(bmi) ? bmi.toFixed(2) : "";
}

function YesNo({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  );
}

export default function Assessment() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [age, setAge] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [cycleType, setCycleType] = useState("R");
  const [cycleLength, setCycleLength] = useState("");
  const [marriageYears, setMarriageYears] = useState("0");
  const [pregnant, setPregnant] = useState("no");
  const [abortions, setAbortions] = useState("0");

  const [weightGain, setWeightGain] = useState("no");
  const [hairGrowth, setHairGrowth] = useState("no");
  const [skinDarkening, setSkinDarkening] = useState("no");
  const [hairLoss, setHairLoss] = useState("no");
  const [pimples, setPimples] = useState("no");
  const [fastFood, setFastFood] = useState("no");
  const [regularExercise, setRegularExercise] = useState("no");

  const bmi = useMemo(() => calcBmi(weightKg, heightCm), [weightKg, heightCm]);

  async function submit() {
    setError("");
    setLoading(true);
    try {
      const payload = {
        age: Number(age),
        weight_kg: Number(weightKg),
        height_cm: Number(heightCm),
        blood_group: bloodGroup,
        cycle_type: cycleType,
        cycle_length_days: Number(cycleLength),
        marriage_years: Number(marriageYears),
        pregnant,
        abortions: Number(abortions),
        weight_gain: weightGain,
        hair_growth: hairGrowth,
        skin_darkening: skinDarkening,
        hair_loss: hairLoss,
        pimples,
        fast_food: fastFood,
        regular_exercise: regularExercise
      };
      const res = await api.assess(payload);
      sessionStorage.setItem("pcos_last_result", JSON.stringify(res));
      navigate("/result");
    } catch (err) {
      setError(err.message || "Assessment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardHeader">
          <div>
            <h1 className="h1">PCOS Assessment</h1>
            <div className="muted">Enter details. BMI is calculated automatically.</div>
          </div>
          <span className="pill">~2 minutes</span>
        </div>

        {!started ? (
          <>
            <div className="muted">
              Click Start to begin. Your result and history will be saved to the database.
            </div>
            <div className="btnRow">
              <button className="btn" onClick={() => setStarted(true)}>
                Start Assessment
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div>
                <label>Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 24" />
              </div>
              <div>
                <label>Blood Group</label>
                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div>
                <label>Weight (kg)</label>
                <input value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="e.g., 62" />
              </div>
              <div>
                <label>Height (cm)</label>
                <input value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 160" />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Cycle type</label>
                <select value={cycleType} onChange={(e) => setCycleType(e.target.value)}>
                  <option value="R">Regular (R)</option>
                  <option value="I">Irregular (I)</option>
                </select>
              </div>
              <div>
                <label>Cycle length (days)</label>
                <input
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  placeholder="e.g., 28"
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Marriage years</label>
                <input
                  value={marriageYears}
                  onChange={(e) => setMarriageYears(e.target.value)}
                  placeholder="0"
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <label>BMI (auto)</label>
                <input value={bmi} readOnly placeholder="Auto-calculated" />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Pregnant</label>
                <select value={pregnant} onChange={(e) => setPregnant(e.target.value)}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label>Abortions (count)</label>
                <input
                  value={abortions}
                  onChange={(e) => setAbortions(e.target.value)}
                  placeholder="0"
                  type="number"
                  min="0"
                />
              </div>
            </div>

            <div className="divider" />
            <h2 className="h2">Yes / No Questions</h2>
            <div className="row">
              <YesNo label="Weight gain" value={weightGain} onChange={setWeightGain} />
              <YesNo label="Hair growth" value={hairGrowth} onChange={setHairGrowth} />
            </div>
            <div className="row">
              <YesNo label="Skin darkening" value={skinDarkening} onChange={setSkinDarkening} />
              <YesNo label="Hair loss" value={hairLoss} onChange={setHairLoss} />
            </div>
            <div className="row">
              <YesNo label="Pimples" value={pimples} onChange={setPimples} />
              <YesNo label="Regularly taking fast food" value={fastFood} onChange={setFastFood} />
            </div>
            <div className="row">
              <YesNo label="Regular exercise" value={regularExercise} onChange={setRegularExercise} />
              <div />
            </div>

            <div className="btnRow">
              <button className="btn" disabled={loading} onClick={submit}>
                {loading ? "Predicting..." : "Predict PCOS"}
              </button>
              <button className="btn btnGhost" disabled={loading} onClick={() => setStarted(false)}>
                Cancel
              </button>
            </div>
            {error ? <div className="error">{error}</div> : null}
          </>
        )}
      </div>

      <div className="card">
        <h2 className="h2">Tips</h2>
        <div className="muted" style={{ lineHeight: 1.7 }}>
          - Cycle length is typically 21–35 days. Outside this range may indicate irregularity.
          <br />- Lifestyle changes (protein + fiber diet, exercise, sleep) can help symptoms.
          <br />- If result is positive risk, consult a doctor for further enquiries.
        </div>
        <div className="divider" />
        <div className="pill">Sleep: 7–9 hours/day (adults)</div>
      </div>
    </div>
  );
}


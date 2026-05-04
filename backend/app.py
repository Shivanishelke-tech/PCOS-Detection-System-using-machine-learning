from __future__ import annotations

from functools import wraps
from flask import Flask, jsonify, request

from auth import create_user, get_user, get_user_id_for_token, issue_token, verify_user
from chat import answer_question
from db import get_conn, init_db
from model import bmi_from, predict_pcos

app = Flask(__name__)


# ---------------- CORS ---------------- #

def _cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:5173"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return resp


@app.after_request
def after(resp):
    return _cors(resp)


# ---------------- Health ---------------- #

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True})


# ---------------- Register ---------------- #

@app.route("/api/register", methods=["POST", "OPTIONS"])
def register():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))

    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""

    if not email or "@" not in email:
        return jsonify({"error": "Valid email is required"}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    try:
        user_id = create_user(email=email, password=password)
    except Exception:
        return jsonify({"error": "Email already exists"}), 400

    token = issue_token(user_id)
    return jsonify({"token": token})


# ---------------- Login ---------------- #

@app.route("/api/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))

    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""

    user_id = verify_user(email=email, password=password)
    if not user_id:
        return jsonify({"error": "Invalid email or password"}), 401

    token = issue_token(user_id)
    return jsonify({"token": token})


# ---------------- Auth Middleware ---------------- #

def require_auth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        authz = request.headers.get("Authorization") or ""
        token = ""
        if authz.lower().startswith("bearer "):
            token = authz.split(" ", 1)[1].strip()

        user_id = get_user_id_for_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        request.user_id = user_id  # type: ignore
        return fn(*args, **kwargs)

    return wrapper


@app.route("/api/me", methods=["GET", "OPTIONS"])
@require_auth
def me():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))
    row = get_user(request.user_id)
    return jsonify({"user": dict(row)})


# ---------------- PCOS Assessment ---------------- #

@app.route("/api/assess", methods=["POST", "OPTIONS"])
@require_auth
def assess():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))

    data = request.get_json(force=True) or {}

    required = [
        "age",
        "weight_kg",
        "height_cm",
        "blood_group",
        "cycle_type",            # R or I
        "cycle_length_days",
        "marriage_years",
        "pregnant",
        "abortions",
        "weight_gain",
        "hair_growth",
        "skin_darkening",
        "hair_loss",
        "pimples",
        "fast_food",
        "regular_exercise",
    ]

    missing = [k for k in required if k not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    # Calculate BMI
    bmi = bmi_from(float(data["weight_kg"]), float(data["height_cm"]))

    # Prepare input for model (must match training order)
    model_input = {
        "age": int(data["age"]),
        "weight_kg": float(data["weight_kg"]),
        "height_cm": float(data["height_cm"]),
        "blood_group": data["blood_group"],
        "cycle_type": 1 if data["cycle_type"] in ("I", 1, "1") else 0,
        "cycle_length_days": int(data["cycle_length_days"]),
        "marriage_years": int(data["marriage_years"]),
        "pregnant": 1 if data["pregnant"] in (True, 1, "1", "yes", "Yes") else 0,
        "abortions": int(data["abortions"]),
        "weight_gain": 1 if data["weight_gain"] in (True, 1, "1", "yes", "Yes") else 0,
        "hair_growth": 1 if data["hair_growth"] in (True, 1, "1", "yes", "Yes") else 0,
        "skin_darkening": 1 if data["skin_darkening"] in (True, 1, "1", "yes", "Yes") else 0,
        "hair_loss": 1 if data["hair_loss"] in (True, 1, "1", "yes", "Yes") else 0,
        "pimples": 1 if data["pimples"] in (True, 1, "1", "yes", "Yes") else 0,
        "fast_food": 1 if data["fast_food"] in (True, 1, "1", "yes", "Yes") else 0,
        "regular_exercise": 1 if data["regular_exercise"] in (True, 1, "1", "yes", "Yes") else 0,
        "bmi": bmi,
    }

    pred = predict_pcos(model_input)

    with get_conn() as conn:
        cur = conn.execute(
            """
            INSERT INTO assessments (
              user_id, age, weight_kg, height_cm, bmi,
              blood_group, cycle_length_days,
              married, weight_gain, skin_darkening,
              hair_loss, acne, fast_food, regular_exercise,
              score, prediction, recommendation
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                request.user_id,
                model_input["age"],
                model_input["weight_kg"],
                model_input["height_cm"],
                round(bmi, 2),
                str(data["blood_group"]),
                model_input["cycle_length_days"],
                1 if model_input["marriage_years"] > 0 else 0,
                model_input["weight_gain"],
                model_input["skin_darkening"],
                model_input["hair_loss"],
                model_input["pimples"],
                model_input["fast_food"],
                model_input["regular_exercise"],
                pred.score,
                pred.label,
                pred.recommendation,
            ),
        )
        assessment_id = int(cur.lastrowid)

    return jsonify({
        "assessment_id": assessment_id,
        "bmi": round(bmi, 2),
        "score": pred.score,
        "prediction": pred.label,
        "recommendation": pred.recommendation,
    })


# ---------------- History ---------------- #

@app.route("/api/history", methods=["GET", "OPTIONS"])
@require_auth
def history():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))

    with get_conn() as conn:
        rows = conn.execute(
            """
            SELECT id, created_at, age, weight_kg, height_cm, bmi,
                   blood_group, cycle_length_days,
                   score, prediction, recommendation
            FROM assessments
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT 100
            """,
            (request.user_id,),
        ).fetchall()

    return jsonify({"history": [dict(r) for r in rows]})


# ---------------- Chat ---------------- #

@app.route("/api/chat", methods=["POST", "OPTIONS"])
@require_auth
def chat():
    if request.method == "OPTIONS":
        return _cors(jsonify({"ok": True}))

    data = request.get_json(force=True) or {}
    message = data.get("message") or ""
    ans = answer_question(message)

    return jsonify({
        "answer": ans.answer,
        "sources": ans.sources
    })


# ---------------- Run ---------------- #

if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=True)
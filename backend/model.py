import pickle
import numpy as np
from dataclasses import dataclass


# Load model and scaler once at startup
model = pickle.load(open("pcos_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))


# ---------------- BMI Calculation ---------------- #

def bmi_from(weight_kg: float, height_cm: float) -> float:
    height_m = height_cm / 100.0
    return weight_kg / (height_m ** 2)


# ---------------- Prediction Result Object ---------------- #

@dataclass
class PredictionResult:
    score: float
    label: str
    recommendation: str


# ---------------- Main Prediction Function ---------------- #

def predict_pcos(data: dict) -> PredictionResult:
    """
    Expects dictionary with keys:

    age
    weight_kg
    height_cm
    blood_group
    cycle_type
    cycle_length_days
    marriage_years
    pregnant
    abortions
    weight_gain
    hair_growth
    skin_darkening
    hair_loss
    pimples
    fast_food
    regular_exercise
    bmi
    """

    # Convert blood group safely to numeric
    blood_group_value = hash(str(data["blood_group"])) % 8

    # Arrange features EXACTLY like training order
    features = [
        data["age"],
        data["weight_kg"],
        data["height_cm"],
        blood_group_value,
        data["cycle_type"],
        data["cycle_length_days"],
        data["marriage_years"],
        data["pregnant"],
        data["abortions"],
        data["weight_gain"],
        data["hair_growth"],
        data["skin_darkening"],
        data["hair_loss"],
        data["pimples"],
        data["fast_food"],
        data["regular_exercise"],
        data["bmi"],
    ]

    X = np.array([features])

    # Scale
    X_scaled = scaler.transform(X)

    # Predict
    prediction = model.predict(X_scaled)[0]
    probability = model.predict_proba(X_scaled)[0][1]

    label = "PCOS Detected" if prediction == 1 else "No PCOS Detected"

    recommendation = (
        "Consult a gynecologist for further hormonal evaluation."
        if prediction == 1
        else "Maintain healthy lifestyle and regular monitoring."
    )

    return PredictionResult(
        score=round(float(probability), 4),
        label=label,
        recommendation=recommendation,
    )
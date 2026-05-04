import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

print("Loading Dataset...")

# Load dataset
data = pd.read_excel("PCOS_data_without_infertility.xlsx", sheet_name="Full_new")

# Remove extra spaces in column names
data.columns = data.columns.str.strip()

print("Dataset Loaded Successfully!")
print("Dataset Shape:", data.shape)

# ===============================
# SELECT IMPORTANT FEATURES
# ===============================

selected_columns = [
    "PCOS (Y/N)",
    "Age (yrs)",
    "Weight (Kg)",
    "Height(Cm)",
    "Blood Group",
    "Cycle(R/I)",
    "Cycle length(days)",
    "Marraige Status (Yrs)",
    "Pregnant(Y/N)",
    "No. of aborptions",
    "Weight gain(Y/N)",
    "hair growth(Y/N)",
    "Skin darkening (Y/N)",
    "Hair loss(Y/N)",
    "Pimples(Y/N)",
    "Fast food (Y/N)",
    "Reg.Exercise(Y/N)"
]

data = data[selected_columns]

# ===============================
# BMI CALCULATION
# ===============================

data["BMI_calculated"] = data["Weight (Kg)"] / ((data["Height(Cm)"] / 100) ** 2)

# ===============================
# HANDLE CATEGORICAL AUTOMATICALLY
# ===============================

# Convert categorical columns automatically
for col in data.columns:
    if data[col].dtype == "object":
        data[col] = data[col].astype("category").cat.codes

# Convert everything to numeric safely
data = data.apply(pd.to_numeric, errors="coerce")

# Instead of dropping ALL rows, fill missing values with median
data = data.fillna(data.median(numeric_only=True))

print("Final Cleaned Shape:", data.shape)

# ===============================
# SPLIT DATA
# ===============================

X = data.drop("PCOS (Y/N)", axis=1)
y = data["PCOS (Y/N)"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training Data Shape:", X_train.shape)
print("Testing Data Shape:", X_test.shape)

# ===============================
# SCALING
# ===============================

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ===============================
# TRAIN MODEL
# ===============================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

# ===============================
# EVALUATION
# ===============================

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", accuracy)
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# ===============================
# SAVE MODEL
# ===============================

pickle.dump(model, open("pcos_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))

print("\nModel and Scaler saved successfully!")
import os
import joblib
import numpy as np


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "landslide_xgb_model.pkl"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "landslide_scaler.pkl"
)


# Load model and scaler once when FastAPI starts
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


FEATURE_NAMES = [
    "latitude",
    "longitude",
    "elevation",
    "slope",
    "rainfall_1d",
    "rainfall_7d",
    "rainfall_30d"
]


def predict_risk(
    latitude,
    longitude,
    elevation,
    slope,
    rainfall_1d,
    rainfall_7d,
    rainfall_30d
):

    features = np.array([[
        latitude,
        longitude,
        elevation,
        slope,
        rainfall_1d,
        rainfall_7d,
        rainfall_30d
    ]])

    # Scale features
    scaled_features = scaler.transform(features)

    # Prediction
    prediction = model.predict(scaled_features)[0]

    # Probability
    probabilities = model.predict_proba(scaled_features)[0]

    confidence = float(max(probabilities))

    return {
        "prediction": int(prediction),
        "confidence": confidence
    }
from pathlib import Path

import joblib
import pandas as pd

from ..config import settings


class RiskPredictor:

    def __init__(self):
        self.mode = settings.ml_mode.lower()

        self.model = None
        self.scaler = None

        self.model_version = "demo_v1"
        self.real_model_available = False
        self.model_error = None

        # Load the real ML model
        if self.mode == "real":
            self._load_real_model()

    # =========================================================
    # LOAD REAL MODEL
    # =========================================================

    def _load_real_model(self):

        model_path = Path(settings.model_path)
        scaler_path = Path(settings.scaler_path)

        try:

            if not model_path.exists():
                raise FileNotFoundError(
                    f"ML model not found: {model_path}"
                )

            if not scaler_path.exists():
                raise FileNotFoundError(
                    f"ML scaler not found: {scaler_path}"
                )

            print("Loading ML model...")

            self.model = joblib.load(model_path)

            print("Loading ML scaler...")

            self.scaler = joblib.load(scaler_path)

            self.model_version = model_path.stem
            self.real_model_available = True

            print("=" * 60)
            print("REAL ML MODEL LOADED SUCCESSFULLY")
            print("=" * 60)
            print(f"Model:  {model_path}")
            print(f"Scaler: {scaler_path}")
            print(f"Features: {settings.model_features}")
            print("=" * 60)

        except Exception as e:

            self.model = None
            self.scaler = None
            self.real_model_available = False

            self.model_error = str(e)

            print("")
            print("=" * 60)
            print("WARNING: REAL ML MODEL COULD NOT BE LOADED")
            print("=" * 60)
            print(f"Reason: {e}")
            print("")
            print("FastAPI will continue in DEMO MODE.")
            print("=" * 60)
            print("")

    # =========================================================
    # RISK CATEGORY
    # =========================================================

    @staticmethod
    def category(score):

        if score >= 9:
            return "CRITICAL"

        if score >= 7:
            return "VERY HIGH"

        if score >= 5:
            return "HIGH"

        if score >= 3:
            return "MEDIUM"

        if score >= 1:
            return "LOW"

        return "VERY LOW"

    # =========================================================
    # DEMO FALLBACK
    # =========================================================

    def _demo_prediction(self, features):

        latitude = float(features["latitude"])
        longitude = float(features["longitude"])
        elevation = float(features["elevation"])
        slope = float(features["slope"])

        rainfall_1d = float(features["rainfall_1d"])
        rainfall_7d = float(features["rainfall_7d"])
        rainfall_30d = float(features["rainfall_30d"])

        slope_score = min(
            max(slope / 45.0, 0.0),
            1.0
        )

        rainfall_1d_score = min(
            max(rainfall_1d / 100.0, 0.0),
            1.0
        )

        rainfall_7d_score = min(
            max(rainfall_7d / 300.0, 0.0),
            1.0
        )

        rainfall_30d_score = min(
            max(rainfall_30d / 600.0, 0.0),
            1.0
        )

        elevation_score = min(
            max(elevation, 0.0) / 3000.0,
            1.0
        )

        probability = (
            0.35 * slope_score
            + 0.25 * rainfall_1d_score
            + 0.20 * rainfall_7d_score
            + 0.15 * rainfall_30d_score
            + 0.05 * elevation_score
        )

        probability = max(
            0.0,
            min(1.0, probability)
        )

        return probability

    # =========================================================
    # REAL ML PREDICTION
    # =========================================================

    def _real_prediction(self, features):

        # -----------------------------------------------------
        # Create DataFrame using EXACT training feature order
        # -----------------------------------------------------

        values = {
            feature: float(features[feature])
            for feature in settings.model_features
        }

        dataframe = pd.DataFrame(
            [values],
            columns=settings.model_features
        )

        # -----------------------------------------------------
        # Apply the SAME scaler used during training
        # -----------------------------------------------------

        scaled_values = self.scaler.transform(
            dataframe
        )

        # -----------------------------------------------------
        # XGBoost prediction
        # -----------------------------------------------------

        probability = float(
            self.model.predict_proba(
                scaled_values
            )[0][1]
        )

        # Keep probability between 0 and 1
        probability = max(
            0.0,
            min(1.0, probability)
        )

        # Convert probability to 0-10 risk score
        score = round(
            probability * 10,
            1
        )

        return {
            "risk_probability": round(
                probability,
                4
            ),

            "risk_score": score,

            "risk_category": self.category(
                score
            ),

            "model_version": self.model_version,

            "contributing_factors": {
                feature: float(features[feature])
                for feature in settings.model_features
            }
        }

    # =========================================================
    # MAIN PREDICTION FUNCTION
    # =========================================================

    def predict(self, features):

        # -----------------------------------------------------
        # Check required features
        # -----------------------------------------------------

        missing_features = [
            name
            for name in settings.model_features
            if name not in features
        ]

        if missing_features:

            raise ValueError(
                f"Missing ML features: {missing_features}"
            )

        # -----------------------------------------------------
        # Try REAL model
        # -----------------------------------------------------

        if self.real_model_available:

            try:

                result = self._real_prediction(
                    features
                )

                print("")
                print("=" * 60)
                print("REAL ML PREDICTION")
                print("=" * 60)
                print(
                    f"Probability: "
                    f"{result['risk_probability']}"
                )
                print(
                    f"Risk Score: "
                    f"{result['risk_score']}"
                )
                print(
                    f"Risk Category: "
                    f"{result['risk_category']}"
                )
                print(
                    f"Model: "
                    f"{result['model_version']}"
                )
                print("=" * 60)
                print("")

                return result

            except Exception as e:

                print("")
                print("=" * 60)
                print("WARNING: REAL ML PREDICTION FAILED")
                print("=" * 60)
                print(f"Reason: {e}")
                print("Falling back to DEMO prediction.")
                print("=" * 60)
                print("")

        # -----------------------------------------------------
        # DEMO FALLBACK
        # -----------------------------------------------------

        probability = self._demo_prediction(
            features
        )

        score = round(
            probability * 10,
            1
        )

        return {
            "risk_probability": round(
                probability,
                4
            ),

            "risk_score": score,

            "risk_category": self.category(
                score
            ),

            "model_version": "demo_v1",

            "contributing_factors": {
                feature: float(features[feature])
                for feature in settings.model_features
            }
        }


# =============================================================
# GLOBAL PREDICTOR INSTANCE
# =============================================================

predictor = RiskPredictor()
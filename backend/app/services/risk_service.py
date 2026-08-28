from pathlib import Path
import joblib
import numpy as np
from ..config import settings

class RiskPredictor:
    def __init__(self):
        self.mode = settings.ml_mode.lower()
        self.model = None
        self.model_version = "mock_v1"
        if self.mode == "real":
            path = Path(settings.model_path)
            if not path.exists():
                raise FileNotFoundError(f"ML model not found: {path}")
            self.model = joblib.load(path)
            self.model_version = path.stem

    @staticmethod
    def category(score):
        if score >= 9: return "CRITICAL"
        if score >= 7: return "HIGH"
        if score >= 4: return "MODERATE"
        return "LOW"

    def predict(self, features):
        ordered = [features[name] for name in settings.model_features]
        if self.mode == "real":
            probability = float(self.model.predict_proba(np.array(ordered).reshape(1, -1))[0][1])
        else:
            rainfall = min(features["rainfall"] / 200, 1)
            slope = min(features["slope"] / 45, 1)
            moisture = min(features["soil_moisture"] / 100, 1)
            history = float(features["historical_landslide"])
            probability = 0.35*rainfall + 0.30*slope + 0.20*moisture + 0.15*history
            probability = max(0.0, min(1.0, probability))
        score = round(probability * 10, 1)
        return {
            "risk_probability": round(probability, 4),
            "risk_score": score,
            "risk_category": self.category(score),
            "model_version": self.model_version,
            "contributing_factors": features,
        }

predictor = RiskPredictor()

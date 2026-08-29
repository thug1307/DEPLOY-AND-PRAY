from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # =====================================================
    # DATABASE
    # =====================================================

    database_url: str = "sqlite:///./ps1.db"


    # =====================================================
    # CORS
    # =====================================================

    cors_origins_raw: str = (
        "http://localhost:5173,"
        "http://127.0.0.1:5173"
    )


    # =====================================================
    # FILE UPLOADS
    # =====================================================

    upload_dir: Path = Path("./uploads")


    # =====================================================
    # MACHINE LEARNING
    # =====================================================

    # Use the REAL trained model
    ml_mode: str = "real"

    # XGBoost model
    model_path: str = "./ml/landslide_xgb_model.pkl"

    # StandardScaler
    scaler_path: str = "./ml/landslide_scaler.pkl"

    # Features expected by the trained model
    model_features_raw: str = (
        "latitude,"
        "longitude,"
        "elevation,"
        "slope,"
        "rainfall_1d,"
        "rainfall_7d,"
        "rainfall_30d"
    )


    # =====================================================
    # ENVIRONMENT FILE
    # =====================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


    # =====================================================
    # CORS PROPERTY
    # =====================================================

    @property
    def cors_origins(self):
        return [
            x.strip()
            for x in self.cors_origins_raw.split(",")
            if x.strip()
        ]


    # =====================================================
    # MODEL FEATURES PROPERTY
    # =====================================================

    @property
    def model_features(self):
        return [
            x.strip()
            for x in self.model_features_raw.split(",")
            if x.strip()
        ]


# =========================================================
# SETTINGS INSTANCE
# =========================================================

settings = Settings()
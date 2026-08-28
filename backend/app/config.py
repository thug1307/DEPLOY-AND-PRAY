from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "sqlite:///./ps1.db"
    cors_origins_raw: str = "http://localhost:5173,http://127.0.0.1:5173"
    upload_dir: Path = Path("./uploads")
    ml_mode: str = "mock"
    model_path: str = "./ml/model.joblib"
    model_features_raw: str = "rainfall,slope,elevation,soil_moisture,historical_landslide"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins(self):
        return [x.strip() for x in self.cors_origins_raw.split(",") if x.strip()]

    @property
    def model_features(self):
        return [x.strip() for x in self.model_features_raw.split(",") if x.strip()]

settings = Settings()

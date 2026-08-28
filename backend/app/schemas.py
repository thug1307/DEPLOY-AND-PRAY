from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

Category = Literal["ROAD_CRACK","ROCKFALL","SOIL_MOVEMENT","WATER_SEEPAGE","LANDSLIDE","OTHER"]
Status = Literal["PENDING","UNDER_REVIEW","RESOLVED"]

class ReportCreate(BaseModel):
    description: str = Field(min_length=3, max_length=5000)
    category: Category
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    image_url: str | None = None

class ReportStatusUpdate(BaseModel):
    status: Status

class ReportOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    description: str
    category: str
    latitude: float
    longitude: float
    image_url: str | None
    status: str
    created_at: datetime

class RiskInput(BaseModel):
    rainfall: float = Field(ge=0)
    slope: float = Field(ge=0, le=90)
    elevation: float = Field(ge=-500, le=10000)
    soil_moisture: float = Field(ge=0, le=100)
    historical_landslide: int = Field(ge=0, le=1)

class RiskOut(BaseModel):
    report_id: int
    risk_probability: float
    risk_score: float
    risk_category: str
    model_version: str
    contributing_factors: dict

class HotspotOut(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    radius_m: float
    report_count: int
    risk_score: float
    risk_category: str
    status: str

class DashboardStats(BaseModel):
    total_reports: int
    pending_reports: int
    high_risk_reports: int
    critical_risk_reports: int
    active_hotspots: int

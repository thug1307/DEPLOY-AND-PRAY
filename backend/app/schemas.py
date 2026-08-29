from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


# =========================================================
# REPORT SCHEMAS
# =========================================================

class ReportCreate(BaseModel):
    """
    Data received when creating a citizen hazard report.
    """

    description: str = Field(
        ...,
        min_length=3,
        max_length=5000
    )

    category: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    image_url: str | None = None

    # Optional because the current frontend does not send it.
    # If your database/model requires it, the route/model
    # should provide a default.
    observation_date: datetime | None = None


class ReportStatusUpdate(BaseModel):
    """
    Used by authorities to update report status.
    """

    status: str = Field(
        ...,
        min_length=1,
        max_length=50
    )


class ReportOut(BaseModel):
    """
    Report returned by the API.
    """

    id: int

    description: str

    category: str

    latitude: float

    longitude: float

    image_url: str | None = None

    status: str | None = None

    observation_date: datetime | None = None

    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# =========================================================
# RISK INPUT
# =========================================================

class RiskInput(BaseModel):
    """
    Input used by the monitoring risk endpoint.

    Frontend sends:

        latitude
        longitude
        date

    GIS service then extracts:

        elevation
        slope
        rainfall_1d
        rainfall_7d
        rainfall_30d

    Together these form the 7 ML features:

        latitude
        longitude
        elevation
        slope
        rainfall_1d
        rainfall_7d
        rainfall_30d
    """

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    date: str = Field(
        ...,
        min_length=10,
        max_length=10
    )


# =========================================================
# RISK LOCATION INPUT
# =========================================================
#
# Kept because some older route/frontend versions import
# RiskLocationInput.
#
# This is intentionally compatible with RiskInput.
# =========================================================

class RiskLocationInput(BaseModel):

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    date: str = Field(
        ...,
        min_length=10,
        max_length=10
    )


# =========================================================
# GIS / ML FEATURES
# =========================================================

class GISFeatures(BaseModel):
    """
    Complete seven-feature input passed to the ML model.
    """

    latitude: float

    longitude: float

    elevation: float

    slope: float

    rainfall_1d: float

    rainfall_7d: float

    rainfall_30d: float


# =========================================================
# RISK OUTPUT
# =========================================================

class RiskOut(BaseModel):
    """
    Risk prediction returned by the backend.
    """

    report_id: int | None = None

    risk_probability: float

    risk_score: float

    risk_category: str

    model_version: str

    contributing_factors: dict[str, Any] = Field(
        default_factory=dict
    )


# =========================================================
# RISK ASSESSMENT OUTPUT
# =========================================================
#
# Kept as a separate schema in case another route imports it.
# =========================================================

class RiskAssessmentOut(BaseModel):

    id: int | None = None

    report_id: int

    risk_probability: float

    risk_score: float

    risk_category: str

    model_version: str

    rainfall: float | None = None

    slope: float | None = None

    elevation: float | None = None

    soil_moisture: float | None = None

    historical_landslide: float | None = None

    contributing_factors: dict[str, Any] = Field(
        default_factory=dict
    )

    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# =========================================================
# HOTSPOT OUTPUT
# =========================================================

class HotspotOut(BaseModel):
    """
    Hotspot returned by:

        GET  /api/hotspots
        POST /api/hotspots/rebuild
    """

    id: int

    latitude: float

    longitude: float

    risk_score: float

    status: str

    report_count: int | None = None

    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )

    # =========================================================
# DASHBOARD STATS
# =========================================================

class DashboardStats(BaseModel):
    """
    Statistics returned by:
        GET /api/dashboard/stats
    """

    total_reports: int = 0

    pending_reports: int = 0

    verified_reports: int = 0

    resolved_reports: int = 0

    high_risk_reports: int = 0

    active_hotspots: int = 0
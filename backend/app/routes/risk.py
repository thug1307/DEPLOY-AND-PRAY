from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Report, RiskAssessment
from ..schemas import RiskInput, RiskLocationInput, RiskOut
from ..services.risk_service import predictor
from ..services.gis_service import gis_service


router = APIRouter(
    prefix="/risk",
    tags=["Risk"]
)


# =========================================================
# GET GIS FEATURES
# =========================================================
#
# Frontend sends:
#
#     latitude
#     longitude
#     date
#
# GIS calculates:
#
#     elevation
#     slope
#     rainfall_1d
#     rainfall_7d
#     rainfall_30d
#
# These become the 7 ML features.
#
# =========================================================

def get_ml_features(
    latitude: float,
    longitude: float,
    date: str
):

    # -----------------------------------------------------
    # Validate date
    # -----------------------------------------------------

    try:

        datetime.strptime(
            date,
            "%Y-%m-%d"
        )

    except ValueError:

        raise HTTPException(
            status_code=400,
            detail="Invalid date format. Use YYYY-MM-DD."
        )

    # -----------------------------------------------------
    # Current rainfall dataset
    # -----------------------------------------------------

    if not (
        "2024-01-01"
        <= date
        <= "2024-12-31"
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "Rainfall data is currently available "
                "only from 2024-01-01 to 2024-12-31."
            )
        )

    # -----------------------------------------------------
    # GIS extraction
    # -----------------------------------------------------

    try:

        features = gis_service.get_features(
            latitude,
            longitude,
            date
        )

        return features

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=(
                f"GIS feature extraction failed: {str(e)}"
            )
        )


# =========================================================
# MONITORING PAGE
# LOCATION → GIS → ML
# =========================================================
#
# Frontend sends ONLY:
#
# {
#     "latitude": 25.34,
#     "longitude": 97.98,
#     "date": "2024-08-15"
# }
#
# Backend automatically gets:
#
# elevation
# slope
# rainfall_1d
# rainfall_7d
# rainfall_30d
#
# Then sends all 7 features to XGBoost.
#
# =========================================================

@router.post(
    "/predict",
    response_model=RiskOut
)
def predict_location(
    payload: RiskLocationInput,
    db: Session = Depends(get_db)
):

    try:

        # -------------------------------------------------
        # STEP 1: GET REAL GIS FEATURES
        # -------------------------------------------------

        input_data = get_ml_features(
            latitude=payload.latitude,
            longitude=payload.longitude,
            date=payload.date
        )

        # -------------------------------------------------
        # STEP 2: RUN REAL ML MODEL
        # -------------------------------------------------

        result = predictor.predict(
            input_data
        )

        # -------------------------------------------------
        # STEP 3: RETURN RESULT
        # -------------------------------------------------

        return {

            "report_id": None,

            "risk_probability":
                result["risk_probability"],

            "risk_score":
                result["risk_score"],

            "risk_category":
                result["risk_category"],

            "model_version":
                result["model_version"],

            "contributing_factors":
                input_data
        }

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=(
                f"Risk prediction failed: {str(e)}"
            )
        )


# =========================================================
# RISK PREDICTION FOR EXISTING REPORT
# =========================================================
#
# Report already contains:
#
#     latitude
#     longitude
#
# Frontend sends:
#
#     date
#
# Backend:
#
# report coordinates
#       ↓
# GIS
#       ↓
# ML
#       ↓
# RiskAssessment saved
#
# =========================================================

@router.post(
    "/{report_id}/predict",
    response_model=RiskOut
)
def predict_risk(
    report_id: int,
    payload: RiskLocationInput,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # Check report
    # -----------------------------------------------------

    report = db.get(
        Report,
        report_id
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    try:

        # -------------------------------------------------
        # Get GIS features using report location
        # -------------------------------------------------

        input_data = get_ml_features(
            latitude=report.latitude,
            longitude=report.longitude,
            date=payload.date
        )

        # -------------------------------------------------
        # Run ML
        # -------------------------------------------------

        result = predictor.predict(
            input_data
        )

        # -------------------------------------------------
        # Save assessment
        # -------------------------------------------------

        assessment = RiskAssessment(

            report_id=report_id,

            risk_probability=
                result["risk_probability"],

            risk_score=
                result["risk_score"],

            risk_category=
                result["risk_category"],

            model_version=
                result["model_version"],

            rainfall=
                input_data["rainfall_1d"],

            slope=
                input_data["slope"],

            elevation=
                input_data["elevation"],

            soil_moisture=None,

            historical_landslide=None,

            contributing_factors={

                "latitude":
                    input_data["latitude"],

                "longitude":
                    input_data["longitude"],

                "elevation":
                    input_data["elevation"],

                "slope":
                    input_data["slope"],

                "rainfall_1d":
                    input_data["rainfall_1d"],

                "rainfall_7d":
                    input_data["rainfall_7d"],

                "rainfall_30d":
                    input_data["rainfall_30d"],
            }
        )

        db.add(
            assessment
        )

        db.commit()

        db.refresh(
            assessment
        )

        # -------------------------------------------------
        # Return result
        # -------------------------------------------------

        return {

            "report_id":
                report_id,

            "risk_probability":
                result["risk_probability"],

            "risk_score":
                result["risk_score"],

            "risk_category":
                result["risk_category"],

            "model_version":
                result["model_version"],

            "contributing_factors":
                input_data
        }

    except HTTPException:

        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=(
                f"Risk prediction failed: {str(e)}"
            )
        )


# =========================================================
# GET LATEST RISK ASSESSMENT
# =========================================================

@router.get(
    "/{report_id}",
    response_model=RiskOut
)
def latest_risk(
    report_id: int,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # Check report
    # -----------------------------------------------------

    if not db.get(
        Report,
        report_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    # -----------------------------------------------------
    # Get latest assessment
    # -----------------------------------------------------

    assessment = db.scalar(

        select(RiskAssessment)

        .where(
            RiskAssessment.report_id == report_id
        )

        .order_by(
            RiskAssessment.created_at.desc()
        )
    )

    if not assessment:

        raise HTTPException(
            status_code=404,
            detail="No risk assessment exists"
        )

    # -----------------------------------------------------
    # Return result
    # -----------------------------------------------------

    return {

        "report_id":
            report_id,

        "risk_probability":
            assessment.risk_probability,

        "risk_score":
            assessment.risk_score,

        "risk_category":
            assessment.risk_category,

        "model_version":
            assessment.model_version,

        "contributing_factors":
            assessment.contributing_factors or {}
    }


# =========================================================
# INDIA RISK ZONES
# =========================================================
#
# Used by the Emergency page.
#
# Frontend sends nothing.
#
# Backend evaluates a set of important locations and
# returns their current GIS + ML risk information.
#
# =========================================================

@router.get(
    "/india/zones"
)
def india_risk_zones():

    # -----------------------------------------------------
    # Representative locations
    #
    # These are NOT random points.
    # They represent major mountainous / landslide-prone
    # regions that we want to visualize on the emergency map.
    # -----------------------------------------------------

    locations = [
        {
            "name": "Himachal Pradesh",
            "latitude": 31.1048,
            "longitude": 77.1734
        },
        {
            "name": "Uttarakhand",
            "latitude": 30.0668,
            "longitude": 79.0193
        },
        {
            "name": "Sikkim",
            "latitude": 27.5330,
            "longitude": 88.5122
        },
        {
            "name": "Arunachal Pradesh",
            "latitude": 27.0844,
            "longitude": 93.6053
        },
        {
            "name": "Assam",
            "latitude": 26.2006,
            "longitude": 92.9376
        },
        {
            "name": "Jammu & Kashmir",
            "latitude": 33.7782,
            "longitude": 76.5762
        },
        {
            "name": "West Bengal",
            "latitude": 27.0238,
            "longitude": 88.2636
        },
        {
            "name": "Kerala",
            "latitude": 10.8505,
            "longitude": 76.2711
        }
    ]

    results = []

    # -----------------------------------------------------
    # Use a date that exists in our rainfall dataset
    # -----------------------------------------------------

    date = "2024-08-15"

    # -----------------------------------------------------
    # Run GIS + ML for every location
    # -----------------------------------------------------

    for location in locations:

        try:

            features = get_ml_features(
                latitude=location["latitude"],
                longitude=location["longitude"],
                date=date
            )

            prediction = predictor.predict(
                features
            )

            results.append({

                "name":
                    location["name"],

                "latitude":
                    location["latitude"],

                "longitude":
                    location["longitude"],

                "risk_probability":
                    prediction["risk_probability"],

                "risk_score":
                    prediction["risk_score"],

                "risk_category":
                    prediction["risk_category"],

                "elevation":
                    features["elevation"],

                "slope":
                    features["slope"],

                "rainfall_1d":
                    features["rainfall_1d"],

                "rainfall_7d":
                    features["rainfall_7d"],

                "rainfall_30d":
                    features["rainfall_30d"]
            })

        except Exception as e:

            # Don't allow one failed location to
            # break the entire emergency map.

            results.append({

                "name":
                    location["name"],

                "latitude":
                    location["latitude"],

                "longitude":
                    location["longitude"],

                "risk_probability":
                    None,

                "risk_score":
                    None,

                "risk_category":
                    "DATA UNAVAILABLE",

                "elevation":
                    None,

                "slope":
                    None,

                "rainfall_1d":
                    None,

                "rainfall_7d":
                    None,

                "rainfall_30d":
                    None,

                "error":
                    str(e)
            })

    return {

        "date": date,

        "count":
            len(results),

        "zones":
            results
    }
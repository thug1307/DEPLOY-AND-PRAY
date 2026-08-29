from pathlib import Path
import uuid

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..models import Report, RiskAssessment
from ..schemas import (
    ReportCreate,
    ReportOut,
    ReportStatusUpdate,
)
from ..services.gis_service import gis_service
from ..services.risk_service import predictor


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


# =========================================================
# CREATE REPORT
# =========================================================
#
# Flow:
#
# Frontend
#    ↓
# description
# category
# latitude
# longitude
# observation_date
# image_url
#    ↓
# Create Report
#    ↓
# GIS
#    ↓
# elevation
# slope
# rainfall_1d
# rainfall_7d
# rainfall_30d
#    ↓
# XGBoost
#    ↓
# RiskAssessment
#
# =========================================================

@router.post(
    "",
    response_model=ReportOut,
    status_code=status.HTTP_201_CREATED
)
def create_report(
    payload: ReportCreate,
    db: Session = Depends(get_db)
):

    try:

        # -------------------------------------------------
        # 1. Create the report
        # -------------------------------------------------

        report = Report(
            description=payload.description,
            category=payload.category,
            latitude=payload.latitude,
            longitude=payload.longitude,
            image_url=payload.image_url,
        )

        db.add(report)

        db.commit()

        db.refresh(report)


        # -------------------------------------------------
        # 2. Extract REAL GIS features
        # -------------------------------------------------

        print("")
        print("=" * 60)
        print("EXTRACTING GIS FEATURES FOR REPORT")
        print("=" * 60)

        gis_features = gis_service.get_features(
            payload.latitude,
            payload.longitude,
            payload.observation_date
        )

        print("GIS FEATURES:")
        print(gis_features)


        # -------------------------------------------------
        # 3. Run REAL XGBoost model
        # -------------------------------------------------

        print("")
        print("RUNNING ML RISK PREDICTION...")

        result = predictor.predict(
            gis_features
        )

        print("ML RESULT:")
        print(result)


        # -------------------------------------------------
        # 4. Save RiskAssessment
        # -------------------------------------------------

        assessment = RiskAssessment(

            report_id=report.id,

            risk_probability=result[
                "risk_probability"
            ],

            risk_score=result[
                "risk_score"
            ],

            risk_category=result[
                "risk_category"
            ],

            model_version=result[
                "model_version"
            ],

            rainfall=gis_features[
                "rainfall_1d"
            ],

            slope=gis_features[
                "slope"
            ],

            elevation=gis_features[
                "elevation"
            ],

            soil_moisture=None,

            historical_landslide=None,

            contributing_factors=gis_features,
        )

        db.add(assessment)

        db.commit()

        db.refresh(assessment)


        print("")
        print("=" * 60)
        print("REPORT + RISK ASSESSMENT CREATED")
        print("=" * 60)
        print(
            f"Report ID: {report.id}"
        )
        print(
            f"Risk: {result['risk_category']}"
        )
        print(
            f"Probability: "
            f"{result['risk_probability']}"
        )
        print("=" * 60)
        print("")


        return report


    except Exception as e:

        db.rollback()

        print("")
        print("=" * 60)
        print("REPORT CREATION FAILED")
        print("=" * 60)
        print(str(e))
        print("=" * 60)
        print("")

        raise HTTPException(
            status_code=500,
            detail=f"Report creation failed: {str(e)}"
        )


# =========================================================
# LIST REPORTS
# =========================================================

@router.get(
    "",
    response_model=list[ReportOut]
)
def list_reports(
    status_filter: str | None = None,
    category: str | None = None,
    db: Session = Depends(get_db)
):

    query = select(
        Report
    ).order_by(
        Report.created_at.desc()
    )


    if status_filter:

        query = query.where(
            Report.status == status_filter
        )


    if category:

        query = query.where(
            Report.category == category
        )


    return db.scalars(
        query
    ).all()


# =========================================================
# GET SINGLE REPORT
# =========================================================

@router.get(
    "/{report_id}",
    response_model=ReportOut
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = db.get(
        Report,
        report_id
    )


    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )


    return report


# =========================================================
# UPDATE REPORT STATUS
# =========================================================

@router.patch(
    "/{report_id}/status",
    response_model=ReportOut
)
def update_status(
    report_id: int,
    payload: ReportStatusUpdate,
    db: Session = Depends(get_db)
):

    report = db.get(
        Report,
        report_id
    )


    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )


    report.status = payload.status

    db.commit()

    db.refresh(report)


    return report


# =========================================================
# IMAGE UPLOAD
# =========================================================

@router.post(
    "/upload-image"
)
async def upload_image(
    file: UploadFile = File(...)
):

    allowed = {
        "image/jpeg",
        "image/png",
        "image/webp"
    }


    if file.content_type not in allowed:

        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPEG, PNG and WEBP "
                "images are accepted"
            )
        )


    content = await file.read()


    if len(content) > 10 * 1024 * 1024:

        raise HTTPException(
            status_code=400,
            detail="Image exceeds 10 MB"
        )


    suffix = Path(
        file.filename or "upload.bin"
    ).suffix.lower()


    filename = (
        f"{uuid.uuid4().hex}"
        f"{suffix}"
    )


    destination = (
        settings.upload_dir /
        filename
    )


    # Make sure upload directory exists
    settings.upload_dir.mkdir(
        parents=True,
        exist_ok=True
    )


    destination.write_bytes(
        content
    )


    return {
        "filename": filename,
        "path": str(destination)
    }
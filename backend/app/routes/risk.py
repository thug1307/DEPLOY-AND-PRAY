from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Report, RiskAssessment
from ..schemas import RiskInput, RiskOut
from ..services.risk_service import predictor

router = APIRouter(prefix="/risk", tags=["Risk"])

@router.post("/{report_id}/predict", response_model=RiskOut)
def predict_risk(report_id: int, payload: RiskInput, db: Session = Depends(get_db)):
    if not db.get(Report, report_id):
        raise HTTPException(404, "Report not found")
    result = predictor.predict(payload.model_dump())
    assessment = RiskAssessment(report_id=report_id, **result | payload.model_dump())
    db.add(assessment); db.commit()
    return {"report_id": report_id, **result}

@router.get("/{report_id}", response_model=RiskOut)
def latest_risk(report_id: int, db: Session = Depends(get_db)):
    if not db.get(Report, report_id):
        raise HTTPException(404, "Report not found")
    a = db.scalar(select(RiskAssessment).where(RiskAssessment.report_id == report_id).order_by(RiskAssessment.created_at.desc()))
    if not a: raise HTTPException(404, "No risk assessment exists")
    return {
        "report_id": report_id, "risk_probability": a.risk_probability,
        "risk_score": a.risk_score, "risk_category": a.risk_category,
        "model_version": a.model_version,
        "contributing_factors": {
            "rainfall": a.rainfall, "slope": a.slope, "elevation": a.elevation,
            "soil_moisture": a.soil_moisture, "historical_landslide": a.historical_landslide
        }
    }

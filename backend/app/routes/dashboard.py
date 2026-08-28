from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Hotspot, Report, RiskAssessment
from ..schemas import DashboardStats

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardStats)
def stats(db: Session = Depends(get_db)):
    return DashboardStats(
        total_reports=db.scalar(select(func.count(Report.id))) or 0,
        pending_reports=db.scalar(select(func.count(Report.id)).where(Report.status=="PENDING")) or 0,
        high_risk_reports=db.scalar(select(func.count(func.distinct(RiskAssessment.report_id))).where(RiskAssessment.risk_score>=7)) or 0,
        critical_risk_reports=db.scalar(select(func.count(func.distinct(RiskAssessment.report_id))).where(RiskAssessment.risk_score>=9)) or 0,
        active_hotspots=db.scalar(select(func.count(Hotspot.id)).where(Hotspot.status=="ACTIVE")) or 0
    )

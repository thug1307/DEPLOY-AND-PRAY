from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Hotspot
from ..schemas import HotspotOut
from ..services.hotspot_service import rebuild_hotspots

router = APIRouter(prefix="/hotspots", tags=["Hotspots"])

@router.post("/rebuild", response_model=list[HotspotOut])
def rebuild(db: Session = Depends(get_db)):
    return rebuild_hotspots(db)

@router.get("", response_model=list[HotspotOut])
def list_hotspots(db: Session = Depends(get_db)):
    return db.scalars(select(Hotspot).where(Hotspot.status=="ACTIVE").order_by(Hotspot.risk_score.desc())).all()

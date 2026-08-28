from pathlib import Path
import uuid
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..config import settings
from ..database import get_db
from ..models import Report
from ..schemas import ReportCreate, ReportOut, ReportStatusUpdate

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.post("", response_model=ReportOut, status_code=status.HTTP_201_CREATED)
def create_report(payload: ReportCreate, db: Session = Depends(get_db)):
    report = Report(**payload.model_dump())
    db.add(report); db.commit(); db.refresh(report)
    return report

@router.get("", response_model=list[ReportOut])
def list_reports(status_filter: str | None = None, category: str | None = None, db: Session = Depends(get_db)):
    query = select(Report).order_by(Report.created_at.desc())
    if status_filter: query = query.where(Report.status == status_filter)
    if category: query = query.where(Report.category == category)
    return db.scalars(query).all()

@router.get("/{report_id}", response_model=ReportOut)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.get(Report, report_id)
    if not report: raise HTTPException(404, "Report not found")
    return report

@router.patch("/{report_id}/status", response_model=ReportOut)
def update_status(report_id: int, payload: ReportStatusUpdate, db: Session = Depends(get_db)):
    report = db.get(Report, report_id)
    if not report: raise HTTPException(404, "Report not found")
    report.status = payload.status
    db.commit(); db.refresh(report)
    return report

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    allowed = {"image/jpeg","image/png","image/webp"}
    if file.content_type not in allowed:
        raise HTTPException(400, "Only JPEG, PNG and WEBP images are accepted")
    content = await file.read()
    if len(content) > 10*1024*1024:
        raise HTTPException(400, "Image exceeds 10 MB")
    suffix = Path(file.filename or "upload.bin").suffix.lower()
    filename = f"{uuid.uuid4().hex}{suffix}"
    destination = settings.upload_dir / filename
    destination.write_bytes(content)
    return {"filename": filename, "path": str(destination)}

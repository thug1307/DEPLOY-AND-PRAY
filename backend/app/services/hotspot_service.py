import math
import numpy as np
from sklearn.cluster import DBSCAN
from sqlalchemy import delete, select
from sqlalchemy.orm import Session
from ..models import Hotspot, HotspotReport, Report, RiskAssessment

def latest_risk(db, report_id):
    row = db.scalar(select(RiskAssessment).where(RiskAssessment.report_id == report_id).order_by(RiskAssessment.created_at.desc()))
    return float(row.risk_score) if row else 0.0

def rebuild_hotspots(db: Session, eps_km=1.0, min_samples=3):
    reports = db.scalars(select(Report).where(Report.status != "RESOLVED")).all()
    db.execute(delete(HotspotReport))
    db.execute(delete(Hotspot))
    if len(reports) < min_samples:
        db.commit()
        return []
    coords = np.array([[r.latitude, r.longitude] for r in reports], dtype=float)
    lat_rad = np.radians(coords[:,0])
    km_coords = np.column_stack([coords[:,0]*111.0, coords[:,1]*111.0*np.cos(lat_rad)])
    labels = DBSCAN(eps=eps_km, min_samples=min_samples).fit_predict(km_coords)
    created = []
    for label in sorted(set(labels)):
        if label == -1: continue
        cluster = [r for r, lab in zip(reports, labels) if lab == label]
        lat = sum(r.latitude for r in cluster) / len(cluster)
        lon = sum(r.longitude for r in cluster) / len(cluster)
        scores = [latest_risk(db, r.id) for r in cluster]
        score = round(max(scores) if scores else 0.0, 1)
        category = "CRITICAL" if score >= 9 else "HIGH" if score >= 7 else "MODERATE" if score >= 4 else "LOW"
        radius_m = 0.0
        for r in cluster:
            d = math.sqrt(((r.latitude-lat)*111.0)**2 + ((r.longitude-lon)*111.0*math.cos(math.radians(lat)))**2)
            radius_m = max(radius_m, d*1000)
        h = Hotspot(name=f"Emerging Hotspot {label+1}", latitude=lat, longitude=lon,
                    radius_m=max(round(radius_m,1),100.0), report_count=len(cluster),
                    risk_score=score, risk_category=category, status="ACTIVE")
        db.add(h); db.flush()
        for r in cluster:
            db.add(HotspotReport(hotspot_id=h.id, report_id=r.id))
        created.append(h)
    db.commit()
    return created

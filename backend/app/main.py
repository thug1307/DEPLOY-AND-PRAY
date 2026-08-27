from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import Base, engine
from . import models
from .routes.reports import router as reports_router
from .routes.risk import router as risk_router
from .routes.hotspots import router as hotspots_router
from .routes.dashboard import router as dashboard_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    yield

app = FastAPI(title="PS1 Landslide Intelligence API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports_router, prefix="/api")
app.include_router(risk_router, prefix="/api")
app.include_router(hotspots_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")

@app.get("/")
def root():
    return {"name": "PS1 Landslide Intelligence API", "status": "running", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}

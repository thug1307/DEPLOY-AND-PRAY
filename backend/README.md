# PS1 Landslide Intelligence Backend

## Run

```bash
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env`, then:

```bash
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs`.

The default `ML_MODE=mock` lets the full API work before the real ML model exists.

## Main endpoints

`POST /api/reports` — citizen report

`GET /api/reports` — list reports

`GET /api/reports/{id}` — one report

`PATCH /api/reports/{id}/status` — authority changes status

`POST /api/risk/{id}/predict` — run/save risk assessment

`GET /api/risk/{id}` — latest risk

`POST /api/hotspots/rebuild` — run DBSCAN

`GET /api/hotspots` — active hotspots

`GET /api/dashboard/stats` — dashboard counters

`POST /api/reports/upload-image` — local image upload for prototype

## Real ML model

Put a scikit-learn/XGBoost-compatible model at `ml/model.joblib` and set:

```env
ML_MODE=real
MODEL_PATH=./ml/model.joblib
MODEL_FEATURES_RAW=rainfall,slope,elevation,soil_moisture,historical_landslide
```

The model must implement `predict_proba(X)`, with class index 1 representing the landslide class. Prefer saving the complete preprocessing + model as one sklearn Pipeline.

## Frontend contract

Example report:

```json
{
  "description": "Large crack on hillside road",
  "category": "ROAD_CRACK",
  "latitude": 26.1445,
  "longitude": 91.7362
}
```

Example risk request:

```json
{
  "rainfall": 155,
  "slope": 38,
  "elevation": 1240,
  "soil_moisture": 80,
  "historical_landslide": 1
}
```

For deployment, replace local image storage with Supabase Storage and use PostgreSQL/PostGIS. Add authentication, migrations, authorization, rate limiting and proper secret management before production use.

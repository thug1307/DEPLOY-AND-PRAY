# API Contract

Frontend should use these stable response fields.

## POST /api/reports

Returns:

```json
{
  "id": 1,
  "description": "Large crack on hillside road",
  "category": "ROAD_CRACK",
  "latitude": 26.1445,
  "longitude": 91.7362,
  "image_url": null,
  "status": "PENDING",
  "created_at": "..."
}
```

## POST /api/risk/{id}/predict

Returns:

```json
{
  "report_id": 1,
  "risk_probability": 0.84,
  "risk_score": 8.4,
  "risk_category": "HIGH",
  "model_version": "xgb_v1",
  "contributing_factors": {}
}
```

## GET /api/hotspots

Returns hotspot objects containing:

`id`, `name`, `latitude`, `longitude`, `radius_m`, `report_count`, `risk_score`, `risk_category`, `status`.

## GET /api/dashboard/stats

Returns:

`total_reports`, `pending_reports`, `high_risk_reports`, `critical_risk_reports`, `active_hotspots`.

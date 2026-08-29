import joblib

model = joblib.load("ml/landslide_xgb_model.pkl")
scaler = joblib.load("ml/landslide_scaler.pkl")

print("\n========== MODEL ==========")
print(model)

print("\n========== MODEL FEATURES ==========")

if hasattr(model, "feature_names_in_"):
    print(model.feature_names_in_)

if hasattr(model, "n_features_in_"):
    print("Number of features:", model.n_features_in_)

print("\n========== SCALER ==========")

print(scaler)

if hasattr(scaler, "feature_names_in_"):
    print("Scaler features:")
    print(scaler.feature_names_in_)

if hasattr(scaler, "n_features_in_"):
    print("Scaler feature count:", scaler.n_features_in_)
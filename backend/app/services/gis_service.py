from pathlib import Path

import rasterio
import numpy as np
import xarray as xr


# ============================================================
# GIS DATA PATHS
# ============================================================

GIS_DIR = Path(__file__).resolve().parents[2] / "GIS"

DEM_PATH = GIS_DIR / "NER_DEM_merged.tif"
RAINFALL_PATH = GIS_DIR / "rainfall_2024.nc"


# ============================================================
# GIS SERVICE
# ============================================================

class GISService:

    def __init__(self):

        # ----------------------------------------------------
        # DEM
        # ----------------------------------------------------

        if not DEM_PATH.exists():
            raise FileNotFoundError(
                f"DEM file not found: {DEM_PATH}"
            )

        print("Loading DEM...")

        self.dem = rasterio.open(DEM_PATH)

        print("DEM loaded successfully")

        print(f"DEM CRS: {self.dem.crs}")

        print(
            f"DEM size: "
            f"{self.dem.width} x {self.dem.height}"
        )

        print(
            f"DEM resolution: {self.dem.res}"
        )

        # ----------------------------------------------------
        # RAINFALL
        # ----------------------------------------------------

        if not RAINFALL_PATH.exists():
            raise FileNotFoundError(
                f"Rainfall file not found: {RAINFALL_PATH}"
            )

        print("Loading rainfall data...")

        self.rainfall = xr.open_dataset(
            RAINFALL_PATH
        )

        print("Rainfall data loaded successfully")

        print(
            f"Rainfall variables: "
            f"{list(self.rainfall.data_vars)}"
        )

        print(
            f"Rainfall time range: "
            f"{self.rainfall.TIME.min().values} "
            f"to "
            f"{self.rainfall.TIME.max().values}"
        )


    # ========================================================
    # COORDINATE TRANSFORMATION
    # ========================================================

    def _transform_coordinates(
        self,
        latitude,
        longitude
    ):

        x = longitude
        y = latitude

        # DEM is already EPSG:4326 in our case,
        # but keep this transformation for safety.

        if (
            self.dem.crs
            and self.dem.crs.to_epsg() != 4326
        ):

            from rasterio.warp import transform

            x, y = transform(
                "EPSG:4326",
                self.dem.crs,
                [longitude],
                [latitude]
            )

            x = x[0]
            y = y[0]

        return x, y


    # ========================================================
    # GET ELEVATION
    # ========================================================

    def get_elevation(
        self,
        latitude,
        longitude
    ):

        x, y = self._transform_coordinates(
            latitude,
            longitude
        )

        try:

            row, col = self.dem.index(
                x,
                y
            )

            if (
                row < 0
                or row >= self.dem.height
                or col < 0
                or col >= self.dem.width
            ):

                raise ValueError(
                    "Location is outside DEM coverage"
                )

            elevation = self.dem.read(
                1,
                window=(
                    (row, row + 1),
                    (col, col + 1)
                )
            )[0, 0]

            if np.ma.is_masked(elevation):

                raise ValueError(
                    "No elevation data available "
                    "at this location"
                )

            elevation = float(elevation)

            if not np.isfinite(elevation):

                raise ValueError(
                    "Invalid elevation value"
                )

            return elevation

        except Exception as e:

            raise ValueError(
                f"Could not get elevation: {e}"
            )


    # ========================================================
    # GET SLOPE
    # ========================================================

    def get_slope(
        self,
        latitude,
        longitude
    ):

        x, y = self._transform_coordinates(
            latitude,
            longitude
        )

        try:

            row, col = self.dem.index(
                x,
                y
            )

            if (
                row <= 0
                or row >= self.dem.height - 1
                or col <= 0
                or col >= self.dem.width - 1
            ):

                raise ValueError(
                    "Location too close to DEM boundary"
                )

            # ------------------------------------------------
            # Read 3 x 3 elevation window
            # ------------------------------------------------

            window = self.dem.read(
                1,
                window=(
                    (row - 1, row + 2),
                    (col - 1, col + 2)
                )
            ).astype(float)

            if not np.all(np.isfinite(window)):

                raise ValueError(
                    "Insufficient elevation data "
                    "for slope calculation"
                )

            # ------------------------------------------------
            # Pixel dimensions
            # ------------------------------------------------

            pixel_x = abs(
                self.dem.transform.a
            )

            pixel_y = abs(
                self.dem.transform.e
            )

            # ------------------------------------------------
            # IMPORTANT:
            #
            # DEM is EPSG:4326, so its pixel size is in
            # degrees. Convert approximate degree distance
            # to metres before calculating slope.
            # ------------------------------------------------

            latitude_rad = np.radians(
                latitude
            )

            meters_per_degree_lat = (
                111320.0
            )

            meters_per_degree_lon = (
                111320.0
                * np.cos(latitude_rad)
            )

            pixel_x_m = (
                pixel_x
                * meters_per_degree_lon
            )

            pixel_y_m = (
                pixel_y
                * meters_per_degree_lat
            )

            # ------------------------------------------------
            # Calculate elevation gradients
            # ------------------------------------------------

            dz_dy, dz_dx = np.gradient(
                window,
                pixel_y_m,
                pixel_x_m
            )

            gradient = np.sqrt(
                dz_dx[1, 1] ** 2
                + dz_dy[1, 1] ** 2
            )

            # ------------------------------------------------
            # Convert slope to degrees
            # ------------------------------------------------

            slope = np.degrees(
                np.arctan(gradient)
            )

            return float(slope)

        except Exception as e:

            raise ValueError(
                f"Could not calculate slope: {e}"
            )


    # ========================================================
    # GET TERRAIN DATA
    # ========================================================

    def get_terrain(
        self,
        latitude,
        longitude
    ):

        elevation = self.get_elevation(
            latitude,
            longitude
        )

        slope = self.get_slope(
            latitude,
            longitude
        )

        return {
            "elevation": elevation,
            "slope": slope
        }


    # ========================================================
    # GET RAINFALL
    # ========================================================

    def get_rainfall(
        self,
        latitude,
        longitude,
        date
    ):

        try:

            # ------------------------------------------------
            # Select nearest rainfall grid point
            # ------------------------------------------------

            point = self.rainfall[
                "RAINFALL"
            ].sel(
                LATITUDE=latitude,
                LONGITUDE=longitude,
                method="nearest"
            )

            # ------------------------------------------------
            # Select requested date
            # ------------------------------------------------

            target_date = np.datetime64(
                date
            )

            daily = point.sel(
                TIME=target_date
            )

            rainfall_1d = float(
                daily.values
            )

            # ------------------------------------------------
            # 7-day rainfall
            # ------------------------------------------------

            start_7 = (
                target_date
                - np.timedelta64(6, "D")
            )

            rainfall_7d = float(
                point.sel(
                    TIME=slice(
                        start_7,
                        target_date
                    )
                ).sum().values
            )

            # ------------------------------------------------
            # 30-day rainfall
            # ------------------------------------------------

            start_30 = (
                target_date
                - np.timedelta64(29, "D")
            )

            rainfall_30d = float(
                point.sel(
                    TIME=slice(
                        start_30,
                        target_date
                    )
                ).sum().values
            )

            return {
                "rainfall_1d": rainfall_1d,

                "rainfall_7d": rainfall_7d,

                "rainfall_30d": rainfall_30d,

                "rainfall_grid_latitude": float(
                    point.LATITUDE.values
                ),

                "rainfall_grid_longitude": float(
                    point.LONGITUDE.values
                )
            }

        except Exception as e:

            raise ValueError(
                f"Could not get rainfall: {e}"
            )


    # ========================================================
    # GET ALL GIS FEATURES
    # ========================================================

    def get_features(
        self,
        latitude,
        longitude,
        date
    ):

        terrain = self.get_terrain(
            latitude,
            longitude
        )

        rainfall = self.get_rainfall(
            latitude,
            longitude,
            date
        )

        return {
            "latitude": float(latitude),

            "longitude": float(longitude),

            "elevation": terrain[
                "elevation"
            ],

            "slope": terrain[
                "slope"
            ],

            "rainfall_1d": rainfall[
                "rainfall_1d"
            ],

            "rainfall_7d": rainfall[
                "rainfall_7d"
            ],

            "rainfall_30d": rainfall[
                "rainfall_30d"
            ]
        }


    # ========================================================
    # GET AFFECTED AREA GRID
    # ========================================================
    #
    # Generates nearby points around a selected location.
    #
    # Each point gets the SAME GIS features used by the
    # existing ML model:
    #
    # latitude
    # longitude
    # elevation
    # slope
    # rainfall_1d
    # rainfall_7d
    # rainfall_30d
    #
    # The existing XGBoost model can then predict risk
    # for every generated point.
    #
    # ========================================================

    def get_affected_area_grid(
        self,
        latitude,
        longitude,
        date,
        grid_size=5,
        spacing=0.02
    ):

        points = []

        half = grid_size // 2

        for row in range(
            -half,
            half + 1
        ):

            for col in range(
                -half,
                half + 1
            ):

                point_latitude = (
                    float(latitude)
                    + row * spacing
                )

                point_longitude = (
                    float(longitude)
                    + col * spacing
                )

                try:

                    features = self.get_features(
                        point_latitude,
                        point_longitude,
                        date
                    )

                    points.append(
                        features
                    )

                except Exception as e:

                    # ------------------------------------------------
                    # Some points may fall outside available GIS data.
                    # We simply skip those points.
                    # ------------------------------------------------

                    print(
                        f"Skipping grid point "
                        f"{point_latitude}, "
                        f"{point_longitude}: {e}"
                    )

        return points


# ============================================================
# SINGLE GIS SERVICE INSTANCE
# ============================================================

gis_service = GISService()
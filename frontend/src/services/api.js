const API_BASE_URL = "http://127.0.0.1:8000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function createReport(report) {
  return request("/reports", {
    method: "POST",
    body: JSON.stringify(report),
  });
}

export async function getReports() {
  return request("/reports");
}

export async function getReport(reportId) {
  return request(`/reports/${reportId}`);
}

export async function getRisk(reportId) {
  return request(`/risk/${reportId}`);
}

export async function predictRisk(reportId, riskData) {
  return request(`/risk/${reportId}/predict`, {
    method: "POST",
    body: JSON.stringify(riskData),
  });
}

export async function getDashboardStats() {
  return request("/dashboard/stats");
}

export async function getHotspots() {
  return request("/hotspots");
}

export async function rebuildHotspots() {
  return request("/hotspots/rebuild", {
    method: "POST",
  });
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/reports/upload-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Image upload failed");
  }

  return response.json();
}
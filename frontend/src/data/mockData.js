export const MOCK_ALERTS = [
  {
    id: 'ALT-101',
    severity: 'critical',
    title: 'Severe Rainfall Warning',
    description: 'IMD predicts 150mm rainfall in East Khasi Hills over the next 24h. High landslide probability.',
    timestamp: '2026-08-26T09:30:00Z',
  },
  {
    id: 'ALT-102',
    severity: 'high',
    title: 'Road Blockade Reported',
    description: 'NH-6 partially blocked near Sonapur due to minor rockfall. Traffic movement restricted.',
    timestamp: '2026-08-26T07:15:00Z',
  },
  {
    id: 'ALT-103',
    severity: 'medium',
    title: 'Soil Moisture Level Alert',
    description: 'Sensors in Aizawl sector 4 indicating rapidly increasing soil saturation.',
    timestamp: '2026-08-25T18:45:00Z',
  }
];

export const MOCK_HOTSPOTS = [
  {
    id: 'HS-001',
    location: 'East Khasi Hills, Meghalaya',
    coordinates: [25.5788, 91.8933],
    riskScore: 8.7,
    riskLevel: 'Critical',
    metrics: {
      rainfall: 85, // out of 100
      slope: 90,
      soilMoisture: 75,
      historicalVulnerability: 80,
      citizenReports: 60,
    },
    reportCount: 12,
    populationExposure: 'High (Approx. 5,000 in immediate vicinity)',
    nearbyInfrastructure: 'NH-6, Local primary school',
  },
  {
    id: 'HS-002',
    location: 'Aizawl North, Mizoram',
    coordinates: [23.7307, 92.7173],
    riskScore: 7.2,
    riskLevel: 'High',
    metrics: {
      rainfall: 60,
      slope: 85,
      soilMoisture: 65,
      historicalVulnerability: 70,
      citizenReports: 40,
    },
    reportCount: 5,
    populationExposure: 'Medium',
    nearbyInfrastructure: 'State Highway 12',
  },
  {
    id: 'HS-003',
    location: 'Gangtok, Sikkim',
    coordinates: [27.3389, 88.6065],
    riskScore: 4.5,
    riskLevel: 'Moderate',
    metrics: {
      rainfall: 40,
      slope: 60,
      soilMoisture: 45,
      historicalVulnerability: 50,
      citizenReports: 10,
    },
    reportCount: 2,
    populationExposure: 'Low',
    nearbyInfrastructure: 'Connecting rural road',
  }
];

export const MOCK_REPORTS = [
  {
    id: 'REP-2026-001',
    location: 'Mawlai, Shillong',
    hazard: 'Road/Hillside Crack',
    riskLevel: 'High',
    date: '2026-08-26 10:15',
    status: 'Under Review'
  },
  {
    id: 'REP-2026-002',
    location: 'Lunglei Road',
    hazard: 'Water Seepage',
    riskLevel: 'Moderate',
    date: '2026-08-26 08:30',
    status: 'Verified'
  },
  {
    id: 'REP-2026-003',
    location: 'Kohima Village',
    hazard: 'Soil Movement',
    riskLevel: 'Critical',
    date: '2026-08-25 16:45',
    status: 'Action Taken'
  },
  {
    id: 'REP-2026-004',
    location: 'Tawang Route',
    hazard: 'Rockfall',
    riskLevel: 'High',
    date: '2026-08-25 14:20',
    status: 'Under Review'
  }
];

# Antivirus Dashboard Backend

## Overview
Node.js/Express backend for the Antivirus Security Dashboard with SQLite database and REST API endpoints.

## Project Structure
```
backend/
├── server.js           # Express server setup
├── database.js         # SQLite initialization and seeding
├── package.json        # Dependencies
└── routes/
    └── api.js          # API endpoints
```

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get overview stats (threats, scans, status)
- `GET /api/health` - Server health check

### Scanning
- `POST /api/scan` - Start a new scan
- `POST /api/scan/:id/update` - Update scan progress
- `POST /api/scan/:id/complete` - Mark scan as completed
- `GET /api/scan-history` - Get past scans

### Threats & Events
- `GET /api/threats` - Get threat logs
- `GET /api/events` - Get protection events
- `GET /api/threat-trends` - Get 7-day threat trends

### Performance & Network
- `GET /api/device-stats` - Current device statistics
- `GET /api/performance` - Device performance history (CPU, memory)
- `GET /api/network` - Network activity logs
- `GET /api/file-types` - File type distribution

### Settings
- `GET /api/settings` - Get user settings
- `POST /api/settings` - Update user settings

## Database Schema

### Tables
1. **scan_history** - Records of all system scans
2. **threat_logs** - Detected threats and actions
3. **protection_events** - Protection-related events
4. **network_activity** - Network usage data
5. **device_performance** - CPU, memory, disk, temperature
6. **user_settings** - User configuration

## Response Examples

### GET /api/dashboard
```json
{
  "threatsDetected": 2,
  "scansCompleted": 3,
  "lastScanTime": "2026-01-15T14:30:00Z",
  "protectionStatus": "Active",
  "systemStatus": "Healthy"
}
```

### GET /api/threats
```json
[
  {
    "id": 1,
    "threat_name": "Trojan.Generic",
    "threat_type": "Malware",
    "severity": "High",
    "detected_at": "2026-01-15T10:20:00Z",
    "file_path": "/Users/Downloads/file.exe",
    "action_taken": "Quarantined",
    "quarantined": 1
  }
]
```

## Frontend Integration

The frontend automatically connects to `http://localhost:3000/api` and:
- Fetches live data on page load
- Updates charts with real data
- Tracks scan progress
- Logs threats and events
- Monitors device performance

## Development Notes

- Database is auto-seeded with sample data on first run
- All timestamps use ISO 8601 format
- CORS is enabled for frontend communication
- Static file serving configured for the HTML frontend

## Troubleshooting

**Port Already in Use:**
```bash
npm start -- --port 3001
```

**Database Issues:**
Delete `backend/antivirus.db` and restart - it will be recreated and reseeded.

**CORS Errors:**
Check that server is running and frontend is connecting to `http://localhost:3000`

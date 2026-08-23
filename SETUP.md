# Antivirus Security Dashboard - Phase 2 Setup Guide

## Project Structure
```
antivirus/
├── antivirus.html          # Frontend (Phase 1)
├── backend/                # Backend Server (Phase 2)
│   ├── server.js           # Express server
│   ├── database.js         # SQLite setup
│   ├── package.json        # Dependencies
│   ├── antivirus.db        # SQLite database (auto-created)
│   ├── routes/
│   │   └── api.js          # API endpoints
│   └── README.md           # Backend documentation
└── SETUP.md                # This file
```

## Phase 2: Backend & Data Setup

### Prerequisites
- Node.js 14+ (download from https://nodejs.org/)
- npm (comes with Node.js)

### Installation Steps

#### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

This installs:
- **express** - Web framework
- **sqlite3** - Database
- **cors** - Cross-origin resource sharing
- **body-parser** - JSON parsing

#### Step 2: Start the Backend Server
```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════╗
║   Antivirus Dashboard Backend Started        ║
║   http://localhost:3000                      ║
║   API: http://localhost:3000/api             ║
╚══════════════════════════════════════════════╝
```

#### Step 3: Open the Frontend
- Open `antivirus.html` in your browser
- Frontend automatically connects to `http://localhost:3000/api`

### Available API Endpoints

#### Dashboard
- `GET /api/dashboard` - Overview stats
- `GET /api/health` - Server status

#### Scans
- `POST /api/scan` - Start new scan
- `GET /api/scan-history` - Get past scans
- `POST /api/scan/:id/update` - Update progress
- `POST /api/scan/:id/complete` - Mark complete

#### Data
- `GET /api/threats` - Threat logs
- `GET /api/events` - Protection events
- `GET /api/threat-trends` - 7-day threat data
- `GET /api/network` - Network activity
- `GET /api/performance` - Device performance
- `GET /api/device-stats` - Current stats
- `GET /api/file-types` - File distribution

#### Settings
- `GET /api/settings` - User settings
- `POST /api/settings` - Save settings

## Features Implemented

### ✅ Phase 1: Frontend (Complete)
- Dashboard with 9 sections
- Chart.js visualizations (4 chart types)
- Interactive scan button with progress
- Expandable device cards
- Mobile responsive design
- Smooth animations

### ✅ Phase 2: Backend & Data (Complete)
- Node.js/Express server
- SQLite database with 6 tables:
  - scan_history
  - threat_logs
  - protection_events
  - network_activity
  - device_performance
  - user_settings
- 15+ REST API endpoints
- Auto-seeding with sample data
- CORS enabled for frontend
- Error handling & logging

## How It Works

1. **Frontend** sends requests to `http://localhost:3000/api/...`
2. **Backend** processes requests and queries SQLite database
3. **Database** stores all scan history, threats, events, and settings
4. **Responses** return JSON data to frontend
5. **Charts & Stats** render with real data from the backend

## Dashboard Workflows

### Running a Scan
1. Click "Scan Now" button
2. Frontend sends `POST /api/scan` request
3. Backend creates scan record in database
4. Progress updates via `POST /api/scan/:id/update`
5. Scan completes with `POST /api/scan/:id/complete`

### Viewing Threat Data
1. Click "Virus & Threat Protection"
2. Frontend fetches `/api/threat-trends` (7-day data)
3. Renders line chart from database records
4. Timeline loads from `/api/events`

### Monitoring Performance
1. Click "Device Performance & Health"
2. Frontend fetches `/api/performance` (24-hour data)
3. Chart displays CPU & memory trends
4. Stats load from `/api/device-stats`

## Database

Located at: `backend/antivirus.db`

### Tables

**scan_history**
```sql
CREATE TABLE scan_history (
  id INTEGER PRIMARY KEY,
  scan_type TEXT,
  timestamp DATETIME,
  duration INTEGER,
  files_scanned INTEGER,
  threats_detected INTEGER,
  status TEXT,
  details TEXT
);
```

**threat_logs**
```sql
CREATE TABLE threat_logs (
  id INTEGER PRIMARY KEY,
  threat_name TEXT,
  threat_type TEXT,
  severity TEXT,
  detected_at DATETIME,
  file_path TEXT,
  action_taken TEXT,
  quarantined INTEGER
);
```

**Other tables**: protection_events, network_activity, device_performance, user_settings

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
set PORT=3001 && npm start
```

### CORS Errors
- Ensure backend is running (`npm start`)
- Check `API_BASE_URL` in antivirus.html is `http://localhost:3000/api`
- Check browser console for detailed errors

### Database Corrupted
```bash
# Delete the database - it will be recreated on next start
rm backend/antivirus.db
npm start
```

### Backend Won't Start
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

## Next Steps (Phase 3+)

- Add authentication & user accounts
- Implement real-time WebSocket updates
- Add scheduled scanning
- Create admin dashboard
- Deploy to production

## Development

### Frontend Connection Code
```javascript
const API_BASE_URL = 'http://localhost:3000/api';

async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  return await response.json();
}
```

### Adding New Endpoints
Edit `backend/routes/api.js` and add new route:
```javascript
router.get('/new-endpoint', (req, res) => {
  // Query database
  db.all('SELECT * FROM table', (err, rows) => {
    res.json(rows);
  });
});
```

Then call from frontend:
```javascript
const data = await apiCall('/new-endpoint');
```

## Support
For issues, check:
1. Server console for error messages
2. Browser DevTools Network tab for API responses
3. `backend/antivirus.db` file exists
4. Node.js and npm versions are current

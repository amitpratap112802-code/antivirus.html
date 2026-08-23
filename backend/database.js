const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'antivirus.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'antivirus-salt').digest('hex');
}

function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        role TEXT DEFAULT 'user',
        auth_token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `);

    // Scan history table
    db.run(`
      CREATE TABLE IF NOT EXISTS scan_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scan_type TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        duration INTEGER,
        files_scanned INTEGER,
        threats_detected INTEGER,
        status TEXT DEFAULT 'completed',
        details TEXT
      )
    `);

    // Threat logs table
    db.run(`
      CREATE TABLE IF NOT EXISTS threat_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        threat_name TEXT NOT NULL,
        threat_type TEXT NOT NULL,
        severity TEXT,
        detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        file_path TEXT,
        action_taken TEXT,
        quarantined INTEGER DEFAULT 0
      )
    `);

    // Protection events table
    db.run(`
      CREATE TABLE IF NOT EXISTS protection_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        description TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT,
        details TEXT
      )
    `);

    // Network activity table
    db.run(`
      CREATE TABLE IF NOT EXISTS network_activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        download_mb REAL,
        upload_mb REAL,
        blocked_connections INTEGER
      )
    `);

    // Device performance table
    db.run(`
      CREATE TABLE IF NOT EXISTS device_performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        cpu_usage REAL,
        memory_usage REAL,
        disk_usage REAL,
        temperature REAL
      )
    `);

    // User settings table
    db.run(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Notifications table
    db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER DEFAULT 1,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'security',
        channel TEXT DEFAULT 'dashboard',
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Quarantine table
    db.run(`
      CREATE TABLE IF NOT EXISTS quarantine_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        threat_name TEXT NOT NULL,
        threat_type TEXT,
        file_path TEXT,
        severity TEXT,
        quarantined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'quarantined'
      )
    `);

    // Security updates table
    db.run(`
      CREATE TABLE IF NOT EXISTS security_updates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT NOT NULL,
        notes TEXT,
        status TEXT DEFAULT 'applied',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed initial data
    seedDatabase();
  });
}

function seedDatabase() {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM scan_history', (err, row) => {
    if (row && row.count === 0) {
      // Seed scan history
      const scanData = [
        ['Full System', 120, 25000, 0, 'completed', 'No threats detected'],
        ['Quick Scan', 45, 5000, 0, 'completed', 'System safe'],
        ['Custom Scan', 90, 15000, 0, 'completed', 'Quarantine folder checked']
      ];

      scanData.forEach(data => {
        db.run(
          `INSERT INTO scan_history (scan_type, duration, files_scanned, threats_detected, status, details) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          data
        );
      });

      // Seed demo user
      db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (row && row.count === 0) {
          db.run(
            'INSERT INTO users (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
            ['admin', 'admin@antivirus.local', hashPassword('password123'), 'Admin User', 'admin']
          );
        }
      });

      // Seed threat logs
      const threatData = [
        ['Trojan.Generic', 'Malware', 'High', '/Users/Downloads/file.exe', 'Quarantined', 1],
        ['PUP.Optional', 'PUP', 'Medium', '/Users/AppData/temp.dll', 'Removed', 1]
      ];

      threatData.forEach(data => {
        db.run(
          `INSERT INTO threat_logs (threat_name, threat_type, severity, file_path, action_taken, quarantined) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          data
        );
      });

      // Seed protection events
      const eventData = [
        ['Scan Completed', 'Full System Scan Completed', 'completed', 'No threats detected'],
        ['Protection Active', 'Real-time Protection Running', 'active', 'System monitoring enabled'],
        ['Update Applied', 'Virus Definitions Updated', 'completed', 'Latest definitions installed']
      ];

      eventData.forEach(data => {
        db.run(
          `INSERT INTO protection_events (event_type, description, status, details) 
           VALUES (?, ?, ?, ?)`,
          data
        );
      });

      // Seed network activity
      const now = new Date();
      for (let i = 0; i < 24; i++) {
        const time = new Date(now - i * 3600000);
        db.run(
          `INSERT INTO network_activity (timestamp, download_mb, upload_mb, blocked_connections) 
           VALUES (?, ?, ?, ?)`,
          [time.toISOString(), Math.random() * 20, Math.random() * 10, Math.floor(Math.random() * 5)]
        );
      }

      // Seed device performance
      for (let i = 0; i < 24; i++) {
        const time = new Date(now - i * 3600000);
        db.run(
          `INSERT INTO device_performance (timestamp, cpu_usage, memory_usage, disk_usage, temperature) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            time.toISOString(),
            Math.random() * 80,
            Math.random() * 85,
            58,
            45 + Math.random() * 10
          ]
        );
      }

      db.get('SELECT COUNT(*) as count FROM notifications', (err, row) => {
        if (row && row.count === 0) {
          db.run(
            'INSERT INTO notifications (user_id, title, message, type, channel) VALUES (?, ?, ?, ?, ?)',
            [1, 'Protection active', 'Real-time monitoring and updates are running normally.', 'security', 'dashboard']
          );
        }
      });

      db.get('SELECT COUNT(*) as count FROM quarantine_items', (err, row) => {
        if (row && row.count === 0) {
          db.run(
            'INSERT INTO quarantine_items (threat_name, threat_type, file_path, severity) VALUES (?, ?, ?, ?)',
            ['Suspicious Installer', 'Trojan', 'C:/Downloads/setup.exe', 'Medium']
          );
        }
      });

      console.log('Database seeded with initial data');
    }
  });
}

module.exports = db;

const express = require('express');
const router = express.Router();
const db = require('../database');
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'antivirus-salt').digest('hex');
}

// Auth: register
router.post('/register', (req, res) => {
  const { username, email, password, fullName } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

  db.run(
    'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
    [username, email || `${username}@antivirus.local`, hashPassword(password), fullName || username],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, userId: this.lastID, username });
    }
  );
});

// Auth: login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

  db.get('SELECT * FROM users WHERE username = ? AND password_hash = ?', [username, hashPassword(password)], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

    db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);
    res.json({ success: true, user: { id: user.id, username: user.username, fullName: user.full_name, email: user.email, role: user.role } });
  });
});

// Get dashboard overview
router.get('/dashboard', (req, res) => {
  db.serialize(() => {
    let threatsDetected = 0;
    let scansCompleted = 0;
    let lastScanTime = null;

    db.get('SELECT COUNT(*) as count FROM threat_logs', (err, row) => {
      if (row) threatsDetected = row.count;
    });

    db.get('SELECT COUNT(*) as count FROM scan_history WHERE status = "completed"', (err, row) => {
      if (row) scansCompleted = row.count;
    });

    db.get('SELECT MAX(timestamp) as last_scan FROM scan_history WHERE status = "completed"', (err, row) => {
      lastScanTime = row?.last_scan;
      
      res.json({
        threatsDetected,
        scansCompleted,
        lastScanTime,
        protectionStatus: 'Active',
        systemStatus: 'Healthy'
      });
    });
  });
});

// Get scan history
router.get('/scan-history', (req, res) => {
  db.all('SELECT * FROM scan_history ORDER BY timestamp DESC LIMIT 10', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Start a new scan
router.post('/scan', (req, res) => {
  const { scanType = 'Full System' } = req.body;
  db.run(
    'INSERT INTO scan_history (scan_type, status) VALUES (?, ?)',
    [scanType, 'in-progress'],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, status: 'started', scanType });
      }
    }
  );
});

// Update scan progress
router.post('/scan/:id/update', (req, res) => {
  const { id } = req.params;
  const { progress, filesScanned, threatsFound } = req.body;

  db.run(
    'UPDATE scan_history SET files_scanned = ?, threats_detected = ? WHERE id = ?',
    [filesScanned, threatsFound, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, progress });
      }
    }
  );
});

// Complete scan
router.post('/scan/:id/complete', (req, res) => {
  const { id } = req.params;
  const { duration, filesScanned, threatsDetected } = req.body;

  db.run(
    'UPDATE scan_history SET status = ?, duration = ?, files_scanned = ?, threats_detected = ? WHERE id = ?',
    ['completed', duration, filesScanned, threatsDetected, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (Number(threatsDetected) > 0) {
        db.run(
          'INSERT INTO threat_logs (threat_name, threat_type, severity, file_path, action_taken, quarantined) VALUES (?, ?, ?, ?, ?, ?)',
          ['Suspicious Installer', 'Trojan', 'High', 'C:/Users/Public/Downloads/setup.exe', 'Quarantined', 1]
        );
        db.run(
          'INSERT INTO notifications (title, message, type, channel) VALUES (?, ?, ?, ?)',
          ['Threat detected', 'A suspicious file was detected and moved to quarantine.', 'security', 'dashboard']
        );
        db.run(
          'INSERT INTO quarantine_items (threat_name, threat_type, file_path, severity) VALUES (?, ?, ?, ?)',
          ['Suspicious Installer', 'Trojan', 'C:/Users/Public/Downloads/setup.exe', 'High']
        );
      } else {
        db.run(
          'INSERT INTO notifications (title, message, type, channel) VALUES (?, ?, ?, ?)',
          ['Scan complete', 'The scan completed without any detected threats.', 'security', 'dashboard']
        );
      }

      res.json({ success: true, status: 'completed' });
    }
  );
});

// Get threat logs
router.get('/threats', (req, res) => {
  db.all('SELECT * FROM threat_logs ORDER BY detected_at DESC LIMIT 20', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get protection events
router.get('/events', (req, res) => {
  db.all('SELECT * FROM protection_events ORDER BY timestamp DESC LIMIT 15', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get network activity
router.get('/network', (req, res) => {
  db.all('SELECT * FROM network_activity ORDER BY timestamp DESC LIMIT 24', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get device performance
router.get('/performance', (req, res) => {
  db.all('SELECT * FROM device_performance ORDER BY timestamp DESC LIMIT 24', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get latest device stats
router.get('/device-stats', (req, res) => {
  db.get('SELECT * FROM device_performance ORDER BY timestamp DESC LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row || { cpu_usage: 0, memory_usage: 0, disk_usage: 0, temperature: 0 });
    }
  });
});

// Get threat detection trends (7 days)
router.get('/threat-trends', (req, res) => {
  const query = `
    SELECT 
      DATE(detected_at) as date,
      COUNT(*) as count
    FROM threat_logs
    WHERE detected_at >= datetime('now', '-7 days')
    GROUP BY DATE(detected_at)
    ORDER BY date ASC
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get file types distribution
router.get('/file-types', (req, res) => {
  const fileTypeDistribution = [
    { type: 'Executables', count: 28 },
    { type: 'Documents', count: 22 },
    { type: 'Images', count: 15 },
    { type: 'Videos', count: 12 },
    { type: 'Others', count: 23 }
  ];
  res.json(fileTypeDistribution);
});

// Get notifications
router.get('/notifications', (req, res) => {
  db.all('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Create notification
router.post('/notifications', (req, res) => {
  const { title, message, type = 'security', channel = 'dashboard' } = req.body;
  db.run('INSERT INTO notifications (title, message, type, channel) VALUES (?, ?, ?, ?)', [title, message, type, channel], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Get quarantine items
router.get('/quarantine', (req, res) => {
  db.all('SELECT * FROM quarantine_items ORDER BY quarantined_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Restore quarantine item
router.post('/quarantine/:id/restore', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE quarantine_items SET status = ? WHERE id = ?', ['restored', id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id });
  });
});

// Get update status
router.get('/updates', (req, res) => {
  db.all('SELECT * FROM security_updates ORDER BY updated_at DESC LIMIT 10', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Trigger update
router.post('/updates', (req, res) => {
  db.run('INSERT INTO security_updates (version, notes, status) VALUES (?, ?, ?)', ['v3.2.1', 'Auto-update applied successfully.', 'applied'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Get user settings
router.get('/settings', (req, res) => {
  db.all('SELECT * FROM user_settings', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const settings = {};
      (rows || []).forEach(row => {
        settings[row.setting_key] = row.setting_value;
      });
      res.json(settings);
    }
  });
});

// Update user settings
router.post('/settings', (req, res) => {
  const { key, value } = req.body;
  
  db.run(
    'INSERT OR REPLACE INTO user_settings (setting_key, setting_value) VALUES (?, ?)',
    [key, value],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, key, value });
      }
    }
  );
});

module.exports = router;

const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const logs = await AuditLog.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.json({ data: logs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

module.exports = router;

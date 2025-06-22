const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Password = require('../models/Password');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalPasswords, totalLogs, logs] = await Promise.all([
      Password.countDocuments({ user: userId }),
      AuditLog.countDocuments({ user: userId }),
      AuditLog.find({ user: userId }).sort({ timestamp: -1 }).limit(5),
    ]);

    const actionBreakdown = await AuditLog.aggregate([
      { $match: { user: req.user._id || req.user.id } },
      { $group: { _id: "$action", count: { $sum: 1 } } }
    ]);

    res.json({
      totalPasswords,
      totalLogs,
      recentLogs: logs,
      actionStats: actionBreakdown,
    });
  } catch (err) {
    console.error("📉 Analytics error:", err.message);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
});

module.exports = router;

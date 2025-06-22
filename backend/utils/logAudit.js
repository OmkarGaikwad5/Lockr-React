const AuditLog = require('../models/AuditLog');

const logAudit = async ({ userId, action, passwordData }) => {
  try {
    await AuditLog.create({
      user: userId,
      action,
      passwordId: passwordData._id,
      site: passwordData.site,
      username: passwordData.username,
    });
  } catch (err) {
    console.error("Audit Log Error:", err.message);
  }
};

module.exports = logAudit;

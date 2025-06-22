const Password = require("../models/Password");
const { encrypt, decrypt } = require("../utils/encryption");
const logAudit = require('../utils/logAudit');


exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });

    // Decrypt passwords before sending
    const decryptedPasswords = passwords.map((p) => ({
      ...p._doc,
      password: decrypt(p.password),
    }));

    res.status(200).json({ data: decryptedPasswords });
  } catch (err) {
    console.error("❌ GET Passwords Error:", err);
    res.status(500).json({ message: "Server error fetching passwords" });
  }
};



exports.createPassword = async (req, res) => {
  const { site, username, password } = req.body;

  if (!site || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const encryptedPassword = encrypt(password);

    const newPass = new Password({
      site,
      username,
      password: encryptedPassword,
      user: req.user.id,
    });

    await newPass.save();
    await logAudit({ userId: req.user.id, action: 'CREATE', passwordData: newPass });

    res.status(201).json({ message: "Password saved", data: newPass });
  } catch (err) {
    console.error("❌ POST Password Error:", err);
    res.status(500).json({ message: "Server error saving password" });
  }
};


exports.updatePassword = async (req, res) => {
  const { site, username, password } = req.body;

  try {
    const existing = await Password.findById(req.params.id);
    if (!existing || existing.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }

    existing.site = site;
    existing.username = username;
    existing.password = encrypt(password);
    await existing.save();
    await logAudit({ userId: req.user.id, action: 'UPDATE', passwordData: existing });


    res.status(200).json({ message: "Password updated", data: existing });
  } catch (err) {
    console.error("❌ PUT Password Error:", err);
    res.status(500).json({ message: "Server error updating password" });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    const existing = await Password.findById(req.params.id);
    if (!existing || existing.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }

    await Password.findByIdAndDelete(req.params.id);
    await logAudit({ userId: req.user.id, action: 'DELETE', passwordData: existing });

    res.status(200).json({ message: "Password deleted" });
  } catch (err) {
    console.error("❌ DELETE Password Error:", err);
    res.status(500).json({ message: "Server error deleting password" });
  }
};

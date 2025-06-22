const express = require("express");
const {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
} = require("../controller/passwordController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// All routes protected
router.get("/", verifyToken, getPasswords);
router.post("/", verifyToken, createPassword);
router.put("/:id", verifyToken, updatePassword);
router.delete("/:id", verifyToken, deletePassword);


module.exports = router;

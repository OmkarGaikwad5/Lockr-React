const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController-temp");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

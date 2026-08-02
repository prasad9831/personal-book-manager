
const express = require("express");
const {register, login, logout, getme} = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getme);

module.exports = router;
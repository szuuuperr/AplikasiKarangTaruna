const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", [
    body("fullname").notEmpty().withMessage("Nama lengkap wajib diisi"),
    body("email").isEmail().withMessage("Format email tidak valid"),
    body("password").isLength({ min: 8 }).withMessage("Password minimal 8 karakter")
], register);

router.post("/login", [
    body("email").isEmail().withMessage("Format email tidak valid"),
    body("password").notEmpty().withMessage("Password wajib diisi")
], login);

module.exports = router;

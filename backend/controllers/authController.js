const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { fullname, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email sudah terdaftar" });

        const user = await User.create({ fullname, email, password });
        const token = user.generateToken();

        res.status(201).json({
            token,
            user: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (err) {
        console.error("Register error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email atau password salah" });

        const match = await user.comparePassword(password);
        if (!match) return res.status(400).json({ message: "Email atau password salah" });

        const token = user.generateToken();

        res.json({
            token,
            user: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Akses ditolak, silakan login terlebih dahulu" });
    }

    try {
        const token = header.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
    }
};

module.exports = auth;

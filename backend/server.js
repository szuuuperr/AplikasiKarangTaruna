require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tutorials", tutorialRoutes);

app.get("/", (req, res) => {
    res.json({ message: "TukangKita API Running" });
});

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
});
const Tutorial = require("../models/Tutorial");

exports.getAllTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial.find().select("-steps");
        res.json(tutorials);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTutorialById = async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id).populate("relatedIds", "title category difficulty duration thumbnail");
        if (!tutorial) return res.status(404).json({ message: "Tutorial tidak ditemukan" });
        res.json(tutorial);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

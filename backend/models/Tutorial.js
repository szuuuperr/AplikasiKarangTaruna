const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true }
}, { _id: false });

const tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["Kayu", "Listrik", "Pipa", "Cat"] },
    difficulty: { type: String, required: true, enum: ["Pemula", "Menengah", "Lanjutan"] },
    duration: { type: String, required: true },
    thumbnail: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    tools: [{ type: String }],
    steps: [stepSchema],
    relatedIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" }]
});

module.exports = mongoose.model("Tutorial", tutorialSchema);

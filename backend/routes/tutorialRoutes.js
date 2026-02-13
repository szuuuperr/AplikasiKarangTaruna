const express = require("express");
const auth = require("../middleware/auth");
const { getAllTutorials, getTutorialById } = require("../controllers/tutorialController");

const router = express.Router();

router.get("/", getAllTutorials);
router.get("/:id", auth, getTutorialById);

module.exports = router;

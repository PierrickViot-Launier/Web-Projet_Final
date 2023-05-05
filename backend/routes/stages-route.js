const express = require("express");

const controleursStages = require("../controllers/stages-controleurs");
const router = express.Router();

router.post("/creation", controleursStages.creation);
router.get("/", controleursStages.getStages)

module.exports = router;

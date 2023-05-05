const express = require("express");

const controleursStages = require("../controllers/stages-controleurs");
const router = express.Router();

router.post("/creation", controleursStages.creation);
router.get("/", controleursStages.getStages);
router.delete("/:stageId", controleursStages.supprimerStage);
router.patch("/:stageId", controleursStages.modifierStage);
module.exports = router;

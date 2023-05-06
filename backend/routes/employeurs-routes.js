const express = require("express");

const controleursEmployeurs = require("../controllers/employeurs-controleurs");
const router = express.Router();

router.post("/creation", controleursEmployeurs.creationEmployeur);
module.exports = router;
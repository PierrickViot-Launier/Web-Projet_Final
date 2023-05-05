const express = require("express");

const controleursEtudiants = require("../controllers/etudiants-controleurs");
const router = express.Router();

router.post("/inscription", controleursEtudiants.inscription);
router.get("/", controleursEtudiants.getEtudiants)
module.exports = router;

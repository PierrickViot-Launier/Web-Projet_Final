const express = require("express");

const controleursEtudiants = require("../controllers/etudiants-controleurs");
const router = express.Router();

router.post("/inscription", controleursEtudiants.inscription);
//router.post('/connexion', controleursEtudiants.connexion);
router.get("/", controleursEtudiants.getEtudiants);
router.get("/:etudiantId", controleursEtudiants.getEtudiantById);
module.exports = router;

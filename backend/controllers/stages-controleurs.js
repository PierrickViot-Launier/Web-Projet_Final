const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");

const creation = async (requete, reponse, next) => {
  const {
    nomContact,
    courrielContact,
    numeroContact,
    nomEntreprise,
    adresseEntreprise,
    type,
    nbPoste,
    description,
    remuneration,
  } = requete.body;

  let nouveauStage = new Stage({
    nomContact,
    courrielContact,
    numeroContact,
    nomEntreprise,
    adresseEntreprise,
    type,
    nbPoste,
    description,
    remuneration,
    etudiants: [],
  });

  try {
    await nouveauStage.save();
  } catch {
    return next(new HttpErreur("Erreur lors de l'ajout du stage", 422));
  }

  reponse.status(201).json({ stage: nouveauStage.toObject({ getter: true }) });
};

const getStages = async (requete, reponse, next) => {
  let stages;
  try {
    stages = await Stage.find();
  } catch (erreur) {
    return next(new HttpErreur("Erreur lors de la récupération des stages", 500));
  }
  if (!stages) {
    return next(new HttpErreur("Aucun stage trouvé", 404));
  }
  reponse.json({ stages: stages });
}
exports.getStages = getStages;
exports.creation = creation;

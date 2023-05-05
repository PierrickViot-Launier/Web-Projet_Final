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
const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (erreur) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
  }
  if (!stage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
  reponse.json({ stage: stage.toObject({ getters: true }) });
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

const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId).populate("etudiants");
  } catch {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500));
  }
  if (!stage) {
    return next(new HttpErreur("Impossible de trouver le stage", 404));
  }
  try {
    await stage.deleteOne();
    stage.etudiants.forEach(etudiant => {
      etudiant.stage = null;
    });
    await stage.etudiants.save();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500));
  }
  reponse.status(200).json({ message: "Stage supprimé" });
};

const modifierStage = async (requete, reponse, next) => {
  const { nbPoste} = requete.body;
  const stageId = requete.params.stageId;

  let stage;

  try {
    stage = await Stage.findById(stageId);
    stage.nbPoste = nbPoste;
    await stage.save();
  } catch {
    return next(new HttpErreur("Erreur lors de la mise à jour du stage", 500));
  }

  reponse.status(200).json({ stage: stage.toObject({ getters: true }) });
}

exports.getStageById = getStageById;
exports.modifierStage = modifierStage;
exports.supprimerStage = supprimerStage;
exports.getStages = getStages;
exports.creation = creation;

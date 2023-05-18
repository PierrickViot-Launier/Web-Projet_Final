const HttpErreur = require("../models/http-erreur");
const Employeur = require("../models/employeur");

const inscription = async (requete, reponse, next) => {
  const { nom, courriel, motDePasse } = requete.body;

  let employeurExiste;

  try {
    employeurExiste = await Employeur.findOne({ courriel: courriel });
  } catch {
    return next(new HttpErreur("Échec vérification si employeur existe", 500));
  }

  if (employeurExiste) {
    return next(
      new HttpErreur("L'employeur existe déjà, veuillez vous connecter", 422)
    );
  }

  let nouvelEmployeur = new Employeur({
    nom,
    courriel,
    motDePasse,
    stages: [],
  });

  try {
    await nouvelEmployeur.save();
  } catch {
    return next(new HttpErreur("Erreur lors de l'ajout de l'employeur", 422));
  }

  reponse
    .status(201)
    .json({ employeur: nouvelEmployeur.toObject({ getter: true }) });
};
const getStagesByUserId = async (requete, reponse, next) => {
  const userId = requete.params.userId;
  let employeur;
  let stages;

  try {
    employeur = await Employeur.findById(userId).populate("stages");
    stages = employeur.stages;
  } catch (erreur) {
    return next(
      new HttpErreur("Erreur lors de la récupération des stages", 500)
    );
  }

  if (!stages || stages.length === 0) {
    return next(
      new HttpErreur("Aucun stage trouvé pour l'employeur fourni", 404)
    );
  }

  reponse.json({
    stages: stages.map((stage) => stage.toObject({ getters: true })),
  });
};

exports.getStagesByUserId = getStagesByUserId;
exports.inscription = inscription;

const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Employeur = require("../models/employeur");

const inscription = async (requete, reponse, next) => {
  const {nom, courriel, motDePasse} = requete.body;

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
    stage: null
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

const connexion = async (requete, reponse, next) => {
  const { courriel, motDePasse } = requete.body;

  let employeurExiste;

  try {
    employeurExiste = await Employeur.findOne({ courriel: courriel });
  } catch {
    return next(
      new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
    );
  }

  if (!employeurExiste || employeurExiste.motDePasse !== motDePasse) {
    return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
  }

  reponse.json({
    message: "connexion réussie!",
    employeur: employeurExiste.toObject({ getters: true }),
  });
};

exports.connexion = connexion;
exports.inscription = inscription;
const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Employeur = require("../models/employeur");

const creationEmployeur = async (requete, reponse, next) => {
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



exports.creationEmployeur = creationEmployeur;
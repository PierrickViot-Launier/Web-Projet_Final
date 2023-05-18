const HttpErreur = require("../models/http-erreur");
const Coordonnateur = require("../models/cordonnateur");

const creation = async (requete, reponse, next) => {
  const { courriel, motDePasse } = requete.body;

  let nouveauCordonnateur = new Coordonnateur({
    courriel,
    motDePasse,
  });

  try {
    await nouveauCordonnateur.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la création du cordonnateur", 500)
    );
  }

  reponse
    .status(201)
    .json({ cordonnateur: nouveauCordonnateur.toObject({ getter: true }) });
};

exports.creation = creation;

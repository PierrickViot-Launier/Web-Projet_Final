const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");
const Employeur = require("../models/employeur");

const connexion = async (requete, reponse, next) => {
  const { courriel, motDePasse } = requete.body;

  let utilisateurExiste;

  try {
    utilisateurExiste = await Etudiant.findOne({ courriel: courriel });
  } catch {
    return next(
      new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
    );
  }
  if (!utilisateurExiste) {
    try {
      utilisateurExiste = await Employeur.findOne({ courriel: courriel });
    } catch {
      return next(
        new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
      );
    }
    
  }
  if (!utilisateurExiste || utilisateurExiste.motDePasse !== motDePasse) {
    return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
  }
  reponse.json({
    message: "connexion réussie!",
    utilisateur: utilisateurExiste.toObject({ getters: true }),
  });
};
exports.connexion = connexion;

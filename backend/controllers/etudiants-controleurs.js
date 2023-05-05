const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");

const inscription = async (requete, reponse, next) => {
  const { DA, nom, courriel, profil } = requete.body;

  let etudiantExiste;

  try {
    etudiantExiste = await Etudiant.findOne({ DA: DA });
  } catch {
    return next(new HttpErreur("Échec vérification étudiant existe", 500));
  }

  if (etudiantExiste) {
    return next(
      new HttpErreur("Étudiant existe déjà, veuillez vous connecter", 422)
    );
  }

  let nouvelEtudiant = new Etudiant({
    DA,
    nom,
    courriel,
    profil,
    stage: null,
  });

  try {
    await nouvelEtudiant.save();
  } catch {
    return next(new HttpErreur("Erreur lors de l'ajout de l'étudiant", 422));
  }

  reponse
    .status(201)
    .json({ etudiant: nouvelEtudiant.toObject({ getter: true }) });
};

const getEtudiants = async (requete, reponse, next) =>{
  let etudiants;
  try {
    etudiants = await Etudiant.find({stage:null});
  } catch (erreur) {
    return next(new HttpErreur("Erreur lors de la récupération des étudiants", 500));
  }
  if (!etudiants) {
    return next(new HttpErreur("Aucun étudiant en recherche de stage", 404));
  }
  reponse
    .status(201)
    .json({ etudiants:etudiants});
}
exports.getEtudiants = getEtudiants;
exports.inscription = inscription;

const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const inscription = async (requete, reponse, next) => {
  const { DA, nom, courriel, motDePasse, profil } = requete.body;

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
    motDePasse,
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

const getEtudiants = async (requete, reponse, next) => {
  let etudiants;
  try {
    etudiants = await Etudiant.find();
  } catch (erreur) {
    return next(
      new HttpErreur("Erreur lors de la récupération des étudiants", 500)
    );
  }
  if (!etudiants) {
    return next(new HttpErreur("Aucun étudiant trouvé", 404));
  }
  reponse.status(201).json({ etudiants: etudiants });
};

const getEtudiantById = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  let etudiant;
  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (erreur) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
    );
  }
  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
  }
  reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};

const postulationStage = async (requete, reponse, next) => {
  // console.log(stageId);

  const { etudiantId, stageId } = requete.body;
  let dejaPostule = false;
  let etudiant;

  let stage;

  try {
    etudiant = await Etudiant.findById(etudiantId).populate("stages");
  } catch (erreur) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
    );
  }

  
  try {
    stage = await Stage.findById(stageId);
  } catch (erreur) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
  }
  etudiant.stages.forEach(stage => {
    if(stage._id == stageId){
      dejaPostule = true
    }
  })
  if (dejaPostule) {
    return next(new HttpErreur("L'étudiant a déjà postulé à ce stage", 404));
  }

  try {
    // console.log(stage);
    etudiant.stages.push(stage);
    await etudiant.save();

    stage.etudiants.push(etudiant);

    await stage.save();
  } catch {
    return next(new HttpErreur("Erreur lors de l'inscription au stage", 500));
  }

  reponse.json({ message: "Étudiant inscrit avec succès" });
};
const getStagesByUserId = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  let etudiant;
  let stages
 
    try {
      etudiant = await Etudiant.findById(etudiantId).populate("stages");
      stages = etudiant.stages
    } catch (erreur) {
      return next(new HttpErreur("Erreur lors de la récupération des stages", 500));
    }
  
    console.log(etudiant)
  if (!stages || stages.length === 0) {
    return next(
      new HttpErreur("Aucun stage trouvé pour l'employeur fourni", 404)
    );
  }

  reponse.json({
    stages: stages.map((stage) => stage.toObject({ getters: true })),
  });
};
//const connexion = async (requete, reponse, next) => {
//  const { courriel, motDePasse } = requete.body;
//
//  let etudiantExiste;
//
//  try {
//    etudiantExiste = await Etudiant.findOne({ courriel: courriel });
///  } catch {
//    return next(
//      new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
//   );
// }
//
// if (!etudiantExiste || etudiantExiste.motDePasse !== motDePasse) {
//    return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
//  }

// reponse.json({
//   message: "connexion réussie!",
//    utilisateur: etudiantExiste.toObject({ getters: true }),
//  });
//};

//exports.connexion = connexion;
exports.getStagesByUserId = getStagesByUserId;
exports.getEtudiantById = getEtudiantById;
exports.getEtudiants = getEtudiants;
exports.inscription = inscription;
exports.postulationStage = postulationStage;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  nomContact: { type: String, required: true },
  courrielContact: { type: String, required: true },
  numeroContact: { type: String, required: true },
  nomEntreprise: { type: String, required: true },
  adresseEntreprise: { type: String, required: true },
  type: { type: String, required: true },
  nbPoste: { type: Int32Array, required: true },
  description: { type: String, required: true },
  remuneration: { type: String, required: true },
  etudiants: [{ type: mongoose.Types.ObjectId, ref: "Etudiant" }],
});

module.exports = mongoose.model("Stage", stageSchema);

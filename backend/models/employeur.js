const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeurSchema = new Schema({
  nom: { type: String, required: true },
  courriel: { type: String, required: true },
  motDePasse: { type: String, required: true },
  stage: [{ type: mongoose.Types.ObjectId, ref: "Stage" }]
});

module.exports = mongoose.model("Employeur", employeurSchema);

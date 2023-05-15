import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function StagesDisponibles() {
  const [lesStages, setLesStages] = useState([]);

  const [open, setOpen] = useState(false);
  
  const [openError, setOpenError] = useState(false);

  const [stageId, setStageId] = useState("");

  const auth = useContext(AuthContext);

  async function getStages(type) {
    try {
      const data = await axios.get("http://localhost:5000/api/stages/");

      const stages = data.data.stages;

      if (type) {
        setLesStages(stages.filter((stage) => stage.type === type));
      } else {
        setLesStages(stages);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStages(auth.profile);
  }, []);

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
      <h2 className="text-2xl font-bold mb-2">Liste des stages disponibles</h2>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStages
            .filter((stage) => stage.etudiants.length < stage.nbPoste)
            .map((stage, index) => (
              <li
                className="ml-4 mb-4"
                key={index}
                onClick={() => {
                  setOpen(true);

                  console.log(stage._id);

                  setStageId(stage._id);
                }}
              >
                <Card className="text-center max-w-xl rounded overflow-hidden shadow-lg flex flex-col bg-white hover:bg-gray">
                  <h3>{stage.nomEntreprise}</h3>
                  <h3>
                    {" "}
                    <span className="font-semibold">Personne contact: </span>
                    {stage.nomContact}
                  </h3>
                  <h3>
                    <span className="font-semibold">Courriel: </span>
                    {stage.courrielContact}
                  </h3>

                  <h3>
                    <span className="font-semibold">Adresse: </span>
                    {stage.adresseEntreprise}
                  </h3>
                  <h3>
                    <span className="font-semibold">Type de stage: </span>
                    {stage.type}
                  </h3>
                  <h3>
                    <span className="font-semibold">Postes disponibles: </span>
                    {stage.nbPoste}
                  </h3>
                  <h3>
                    <span className="font-semibold">Description: </span>
                    {stage.description}
                  </h3>
                </Card>
              </li>
            ))}
        </ul>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Inscription"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"Voulez- vous vous inscrire à ce stage?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              setOpen(false);

              try {
                await axios.patch(
                  "http://localhost:5000/api/etudiants/postulation",
                  { etudiantId: auth.userId, stageId }
                );
              } catch (err) {
                setOpenError(true)
              }
            }}
          >
            Oui
          </Button>
          <Button onClick={() => setOpen(false)}>Non</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openError} onClose={() => setOpenError(false)}>
        <DialogTitle>{"Erreur lors de la postulation"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"Vous avez déjà postulé à ce stage."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          
          <Button onClick={() => setOpenError(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

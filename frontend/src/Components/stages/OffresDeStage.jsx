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

export default function OffresDeStage() {
  const [lesStages, setLesStages] = useState([]);

  const [open, setOpen] = useState(false)
  const [stageId, setStageId] = useState("");

  const auth = useContext(AuthContext);

  async function getStages() {
    try {
      const data = await axios.get("http://localhost:5000/api/employeurs/" + auth.userId + "/stages/");

      const stages = data.data.stages;

    
        setLesStages(stages);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStages();
  }, []);

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl text-center">
      <h2 className="text-2xl font-bold mb-2">Liste des offres de stage créées</h2>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStages
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
                <Card className="text-center max-w-xl rounded overflow-hidden shadow-lg flex flex-col bg-white dark:bg-neutral-700 hover:bg-gray">
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
        <DialogTitle>{"Gérer les offres de stage"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"Que souhaitez-vous faire?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
         
          <Button
            onClick={async () => {
              setOpen(false);

              try {
                await axios.delete(
                  "http://localhost:5000/api/stages/" + stageId,
                  { etudiantId: auth.userId, stageId }
                );
              } catch (err) {
                
              }
            }}
          >
            Supprimer
          </Button>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
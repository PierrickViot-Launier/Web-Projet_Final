import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function NouveauStage() {
  const auth = useContext(AuthContext);
  const [personneContact, setPersonneContact] = useState("");
  const [courriel, setCourriel] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [adresse, setAdresse] = useState("");
  const [typeStage, setTypeStage] = useState("");
  const [nbPoste, setNbPoste] = useState("");
  const [description, setDescription] = useState("");
  const [remuneration, setRemuneration] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  function personneHandler(event) {
    setPersonneContact(event.target.value);
  }

  function courrielHandler(event) {
    setCourriel(event.target.value);
  }

  function telephoneHandler(event) {
    setTelephone(event.target.value);
  }

  function nomEntrepriseHandler(event) {
    setNomEntreprise(event.target.value);
  }

  function adresseHandler(event) {
    setAdresse(event.target.value);
  }

  function stageHandler(event) {
    setTypeStage(event.target.value);
  }

  function posteHandler(event) {
    setNbPoste(event.target.value);
  }

  function descriptionHandler(event) {
    setDescription(event.target.value);
  }

  function remunerationHandler(event) {
    setRemuneration(event.target.value);
  }

  async function ajouterNouveauStageHandler(event) {
    event.preventDefault();

    const payload = {
      nomContact: personneContact,
      courrielContact: courriel,
      numeroContact: telephone,
      nomEntreprise,
      adresseEntreprise: adresse,
      type: typeStage,
      nbPoste,
      description,
      remuneration,
      employeur: auth.userId,
    };

    try {
      await axios.post("http://localhost:5000/api/stages/creation/", payload);
      setPersonneContact("");
      setCourriel("");
      setTelephone("");
      setNomEntreprise("");
      setAdresse("");
      setTypeStage("");
      setNbPoste("");
      setDescription("");
      setRemuneration("");
      setOpen(true);
    } catch (e) {
      console.log(e);
      setOpenError(true);
    }
  }

  return (
    <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={ajouterNouveauStageHandler}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={personneContact}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="nomContact"
            placeholder=""
            onChange={personneHandler}
          />
          <label
            htmlFor="nomContact"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nom de la personne contact
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={courriel}
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="courrielContact"
            placeholder=""
            onChange={courrielHandler}
          />
          <label
            htmlFor="courrielContact"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Courriel de la personne contact
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={telephone}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="telephone"
            placeholder=""
            onChange={telephoneHandler}
          />
          <label
            htmlFor="telephone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Numéro de téléphone de la personne contact
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={nomEntreprise}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="nomEntreprise"
            placeholder=""
            onChange={nomEntrepriseHandler}
          />
          <label
            htmlFor="nomEntreprise"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nom de l'entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={adresse}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="adresse"
            placeholder=""
            onChange={adresseHandler}
          />
          <label
            htmlFor="adresse"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Adresse de l'entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <select
            value={typeStage}
            id="typeStage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={stageHandler}
          >
            <option value="">Type de stage</option>
            <option value="Réseaux et sécurité">Réseaux et sécurité</option>
            <option value="Développement d'applications">
              Développement d'applications
            </option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={nbPoste}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="nbPostes"
            placeholder=""
            onChange={posteHandler}
          />
          <label
            htmlFor="nbPostes"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre de postes disponibles
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            value={description}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="description"
            rows="3"
            placeholder=""
            onChange={descriptionHandler}
          ></textarea>
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description du stage
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={remuneration}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="remuneration"
            placeholder=""
            onChange={remunerationHandler}
          />
          <label
            htmlFor="remuneration"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Rémunération
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 pb-2 pt-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ajouter un stage
        </button>
      </form>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Ajout de stage"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"Le stage a été ajouté avec succès."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openError} onClose={() => setOpenError(false)}>
        <DialogTitle>{"Erreur lors de l'ajout de stage"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {
              "Le stage n'a pas pu être ajouté. Veuillez contacter le coordonnateur Sylvain Labranche à l'adresse courriel suivante: sylvain.labranche@cmontmorency.qc.ca"
            }
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenError(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

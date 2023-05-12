import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Card from "../../shared/Card";
import { useState } from "react";
export default function StagesDisponibles() {
  const [lesStages, setLesStages] = useState([]);

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
    getStages();
  }, []);

  function affichageProfil(event) {
    if (event.target.value) {
      getStages(event.target.value);
    } else {
      getStages();
    }
  }
  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <div className="max-w-6xl">
        <select
          defaultValue=""
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-8 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="profils"
          id="profils"
          onChange={affichageProfil}
        >
          <option value="">Sélectionnez un profil</option>
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'applications">
            Développement d'applications
          </option>
        </select>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {lesStages
            .filter((stage) => stage.etudiants.length < stage.nbPoste)
            .map((stage, index) => (
              <li className="ml-4 mb-4" key={index}>
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
    </div>
  );
}

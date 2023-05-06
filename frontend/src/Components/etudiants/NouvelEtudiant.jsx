import React from "react";
import { useState } from "react";
import axios from "axios";
export default function NouvelEtudiant() {

  const [DA, setDA] = useState("");
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [profil, setProfil] = useState("");
  
  function noDAHandler(event){
    setDA(event.target.value);
  }
  function nomHandler(event){
    setNom(event.target.value);
  }
  function courrielHandler(event){
    setCourriel(event.target.value);
  }
  function profilHandler(event){
    setProfil(event.target.value);
  }
  async function ajouterNouvelEtudiantHandler(event) {
    event.preventDefault();
    const payload = {
      DA,
      nom,
      courriel,
      motDePasse: DA,
      profil
    };

    try {
      await axios.post("http://localhost:5000/api/etudiants/inscription/", payload);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={ajouterNouvelEtudiantHandler}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="DA"
            placeholder=""
            onChange={noDAHandler}
          />
          <label
            htmlFor="DA"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Numéro de DA
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="nom"
            placeholder=""
            onChange={nomHandler}
          />
          <label
            htmlFor="nom"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nom
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="courriel"
            placeholder=""
            onChange={courrielHandler}
          />
          <label
            htmlFor="courriel"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Courriel
          </label>
        </div>
        
        <div className="relative z-0 w-full mb-6 group">
          <select
            value={profil}
            id="profil"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue="profilEtudiant"
            onChange={profilHandler}
          >
            <option value="profilEtudiant">Sélectionnez un profil</option>
            <option value="reseaux">Réseaux et sécurité</option>
            <option value="developpement">Développement d'applications</option>
          </select>
        </div>
        
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 pb-2 pt-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ajouter un étudiant
        </button>
      </form>
    </div>
  );
}

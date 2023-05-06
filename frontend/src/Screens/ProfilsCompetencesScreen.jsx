import React from "react";
import { useState } from "react";

export default function ProfilsCompetencesScreen() {
  function affichageProfil(event) {
    if (event.target.value === "Réseaux et sécurité") {
      document.getElementById("developpement").style.display = "none";
      document.getElementById("reseaux").style.display = "block";
    }
    else if (event.target.value === "Développement d'applications") {
      document.getElementById("reseaux").style.display = "none";
      document.getElementById("developpement").style.display = "block";
    }
    else {
      document.getElementById("reseaux").style.display = "none";
      document.getElementById("developpement").style.display = "none";
    }
  }
  return (
    <div className="flex justify-center mt-8 mb-8">
      <div className="max-w-2xl">
        <select
          defaultValue="Sélectionnez un profil"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="profils"
          id="profils"
          onChange={affichageProfil}
        >
          <option value="Sélectionnez un profil">Sélectionnez un profil</option>
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'applications">
            Développement d'applications
          </option>
        </select>
        <div id="reseaux" className="hidden  mb-4">
          <h2 className="text-2xl font-bold mb-2">Réseaux et sécurité</h2>
          <p>
            Nos étudiants en Gestion de réseaux et sécurité ont suivi des cours
            leur permettant de: gérer des réseaux informatiques et offrir du
            soutien aux personnes qui utilisent des ordinateurs et des réseaux,
            c’est-à-dire: monter un serveur planifier et implanter un réseau
            implanter les technologies et les services propres au réseau
            Internet assurer la gestion du réseau planifier et déployer des
            environnements virtuels planifier et mettre en place la sécurité des
            systèmes informatiques déployer les nouvelles technologies des
            réseaux automatiser les tâches d’administration réseaux superviser
            les réseaux assurer le soutien technique aux utilisateurs découvrir
            des nouvelles technologies connaître de façon approfondie le
            traitement de l’information, les logiciels et les composants de
            l’ordinateur et des périphériques tels que: l’installation et la
            gestion des serveurs et des clients Microsoft et Linux la
            configuration, l’installation et la gestion d’un serveur Web ou de
            courrier le déploiement d’un système et d’une application client la
            mise en place de la sécurité des systèmes informatiques
            l’utilisation des techniques pour tester et sécuriser les
            équipements informatiques le déploiement des environnements virtuels
            et de l’infonuagique la résolution de problèmes de réseaux sur les
            équipements informatiques préparation à la certification CEH
            (Certified Ethical Hacker)
          </p>
        </div>
        <div id="developpement" className="hidden  mb-4">
          <h2 className="text-2xl font-bold mb-2">
            Développement d'applications informatiques
          </h2>
          <p>
            Nos étudiant en Développement d'applications informatiques ont suivi
            des cours leur permettant de: participer à l’analyse des systèmes à
            implanter détecter les problèmes, en dégager la structure et trouver
            les solutions logiques effectuer les jeux d’essai et la mise au
            point des programmes et des systèmes élaborer des systèmes et
            participer à leur implantation ou à leur modification dans les
            entreprises programmer des objets connectés sécuriser les
            applications informatiques virtualiser des postes de travail
            comprendre les notions fondamentales des réseaux gérer les versions
            des fichiers sources des applications informatiques déployer des
            applications infonuagiques découvrir les nouvelles technologies
            connaître de façon approfondie le traitement de l’information, les
            logiciels et les composants de l’ordinateur et des périphériques
            tels que: la programmation structurée et orientée objet et Web
            dynamique les bases de données l’installation et la configuration de
            logiciels les composantes matérielles de l’ordinateur, leur
            installation et leur configuration les systèmes d’exploitation
            (Windows et Linux) les méthodologies Agile telles que SCRUM le
            développement pour plateforme mobile l’assurance qualité logiciel
          </p>
        </div>
      </div>
    </div>
  );
}

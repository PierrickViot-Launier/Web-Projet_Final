import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccueilScreen from "./Screens/AccueilScreen";
import DeroulementStagiaireScreen from "./Screens/DeroulementStagiaireScreen";
import FAQScreen from "./Screens/FAQScreen";
import FormulaireEmployeurScreen from "./Screens/FormulaireEmployeurScreen";
import ProfilsCompetencesScreen from "./Screens/ProfilsCompetencesScreen";
import MainNavigation from "./shared/Navigation/MainNavigation";
import NouveauStage from "./Components/stages/NouveauStage";
import Footer from "./shared/Footer";
import React from "react";
import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./Screens/Auth";
import StagesDisponibles from "./Components/stages/StagesDisponibles";

function App() {
  // useEffect(() => {
  //   getStudents();
  //   getStages();
  //   // createStudent();
  // }, []);

  // async function getStudents() {
  //   try {
  //     const data = await axios.get("http://localhost:5000/api/etudiants/");

  //     const students = data.data.etudiants;

  //     console.log(students);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function getStages() {
  //   try {
  //     const data = await axios.get("http://localhost:5000/api/stages/");

  //     const stages = data.data.stages;

  //     console.log(stages);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function createStudent() {
  //   try {
  //     const payload = {
  //       DA: "65321",
  //       nom: "Mansa Musa",
  //       courriel: "richest@gmail.com",
  //       motDePasse: "12345",
  //       profil: "Développement d'applications",
  //     };
  //     await axios.post(
  //       "http://localhost:5000/api/etudiants/inscription/",
  //       payload
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEtudiant, setIsEtudiant] = useState(false);
  const [isEmployeur, setIsEmployeur] = useState(false);

  const login = useCallback((userId, isEtudiant) => {
    setIsLoggedIn(true);
    setUserId(userId);

    if (isEtudiant) {
      setIsEtudiant(true);
      setIsEmployeur(false);
    } else {
      setIsEtudiant(false);
      setIsEmployeur(true);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setIsEmployeur(false);
    setIsEtudiant(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        isEmployeur: isEmployeur,
        isEtudiant: isEtudiant,
        login: login,
        logout: logout,
      }}
    >
      <React.Fragment>
        <Router>
          <MainNavigation />

          <main>
            <Routes>
              <Route path="/" element={<AccueilScreen />} />

              <Route path="/FAQ" element={<FAQScreen />} />

              <Route path="/Profils" element={<ProfilsCompetencesScreen />} />

              <Route
                path="/Deroulement"
                element={<DeroulementStagiaireScreen />}
              />

              {isLoggedIn && isEmployeur && (
                <Route path="/creerStage" element={<FormulaireEmployeurScreen />} />
              )}
              {isLoggedIn && isEtudiant && (
                <Route path="/stagesDisponibles" element={<StagesDisponibles />} />
              )}

              {!isLoggedIn && <Route path="/Connexion" element={<Auth />} />}
            </Routes>
          </main>
        </Router>

        <Footer />
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;

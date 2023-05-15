import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import AccueilScreen from "./Screens/AccueilScreen";
import DeroulementStagiaireScreen from "./Screens/DeroulementStagiaireScreen";
import FAQScreen from "./Screens/FAQScreen";
import FormulaireEmployeurScreen from "./Screens/FormulaireEmployeurScreen";
import ProfilsCompetencesScreen from "./Screens/ProfilsCompetencesScreen";
import MainNavigation from "./shared/Navigation/MainNavigation";
import StagesPostules from "./Components/stages/StagesPostules"
import Footer from "./shared/Footer";
import { useCallback, useState } from "react";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./Screens/Auth";
import StagesDisponibles from "./Components/stages/StagesDisponibles";
import OffresDeStage from "./Components/stages/OffresDeStage";
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEtudiant, setIsEtudiant] = useState(false);
  const [isEmployeur, setIsEmployeur] = useState(false);
  const [profile, setProfile] = useState("");
 

  const login = useCallback((userId, isEtudiant, typeProfile) => {
    setIsLoggedIn(true);
    setUserId(userId);

    if (isEtudiant) {
      setIsEtudiant(true);
      setIsEmployeur(false);
      setProfile(typeProfile);
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
    setProfile("");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        isEmployeur: isEmployeur,
        isEtudiant: isEtudiant,
        profile: profile,
        login: login,
        logout: logout,
      }}
    >
      <div class="flex flex-col h-screen justify-between">
  


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
                <React.Fragment>
                <Route
                  path="/creerStage"
                  element={<FormulaireEmployeurScreen />}
                />
                <Route
                  path="/gererOffres"
                  element={<OffresDeStage />}
                />
                </React.Fragment>
              )}
              {isLoggedIn && isEtudiant && (
                <React.Fragment>
                <Route
                  path="/stagesDisponibles"
                  element={<StagesDisponibles />}
                />
                <Route
                  path="/stagesPostules"
                  element={<StagesPostules />}
                />
                </React.Fragment>
              )}

              {!isLoggedIn && <Route path="/Connexion" element={<Auth />} />}
            </Routes>
          </main>
        </Router>

        <Footer />
        </div>
    </AuthContext.Provider>
  );
}

export default App;

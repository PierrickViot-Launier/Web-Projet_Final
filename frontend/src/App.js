import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccueilScreen from "./Screens/AccueilScreen";
import DeroulementStagiaireScreen from "./Screens/DeroulementStagiaireScreen";
import FAQScreen from "./Screens/FAQScreen";
import FormulaireEmployeurScreen from "./Screens/FormulaireEmployeurScreen";
import ProfilsCompetencesScreen from "./Screens/ProfilsCompetencesScreen";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Footer from "./shared/Footer";
import React from "react";
function App() {
  return (
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

            <Route path="/Employeur" element={<FormulaireEmployeurScreen />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;

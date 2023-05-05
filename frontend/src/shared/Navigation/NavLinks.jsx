import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

export default function NavLinks() {
  const auth = useContext(AuthContext);

  return (
    <ul className="navLinks">
      <li>
        <NavLink to={"/"}>Accueil</NavLink>
      </li>

      <li>
        <NavLink to={"/FAQ"}>FAQ</NavLink>
      </li>

      <li>
        <NavLink to={"/Profils"}>Profils et compétences</NavLink>
      </li>

      <li>
        <NavLink to={"/Deroulement"}>Déroulement du stage</NavLink>
      </li>

      <li>
        <NavLink to={"/Employeur"}>Employeurs</NavLink>
      </li>

      {auth.isLoggedIn && auth.isEmployeur && (
        <li>
          <NavLink to={"/addStage"}>Créer un stage</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to={"/Connexion"}>Connexion</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Déconnexion</button>
        </li>
      )}
    </ul>
  );
}

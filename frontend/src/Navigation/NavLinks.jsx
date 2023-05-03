import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks() {
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
    </ul>
  );
}

import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isEmployeur: false,
  isEtudiant: false,
  login: () => {},
  logout: () => {},
});

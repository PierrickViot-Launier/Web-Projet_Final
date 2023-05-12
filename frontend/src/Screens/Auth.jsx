import React, { useState, useContext } from "react";
import Button from "../Components/Form/Button";
import Input from "../Components/Form/Input";
import Card from "../shared/Card";
import { useNavigate } from 'react-router-dom';
import "./Auth.css"
import "../shared/Card.css"
import { useHttpClient } from "../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";

import { AuthContext } from "../shared/context/auth-context";

export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {

      
      try {
          
       
        const reponseData = await sendRequest(
          "http://localhost:5000/api/utilisateurs/connexion",
          "POST",
          JSON.stringify({
            courriel: formState.inputs.email.value,
            motDePasse: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(reponseData);
        auth.login(reponseData.utilisateur.id);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const reponseData = await sendRequest(
          "http://localhost:5000/api/employeurs/inscription",
          "POST",
          JSON.stringify({
            nom: formState.inputs.name.value,
            courriel: formState.inputs.email.value,
            motDePasse: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(reponseData);
        auth.login(reponseData.employeur.id);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
       <div className="flex justify-center mt-8 mb-8 text-justify">
    <Card className="authentication">
      <h2>Connexion requise</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Votre nom"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Veuillez entrer votre nom."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="Courriel"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Entrez un courriel valide."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Mot de passe"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Entrez un mot de passe valide, au moins 5 caractères."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Connexion" : "Inscription"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Changer pour {isLoginMode ? "Inscription" : "Connexion"}
      </Button>
    </Card></div>
  );
}

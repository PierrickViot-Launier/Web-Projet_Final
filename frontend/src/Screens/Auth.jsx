import React, { useState, useContext } from "react";

import Input from "../Components/Form/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";

import { AuthContext } from "../shared/context/auth-context";

export default function Auth() {
  return <div>Auth</div>;
}

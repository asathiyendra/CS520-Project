import { useState } from "react";
import { signIn, register } from "./apiCalls";

export default function useAuth() {
  const [user, setUser] = useState(null);

  const loginWithUsernameAndPassword = (
    username,
    password,
    callbackFn = null
  ) => {
    signIn(username, password).then((data) => {
      console.log(data);
      if (data.error) {
        if (callbackFn) {
          return callbackFn(data.error);
        }
      }

      setUser(data);

      if (callbackFn) {
        return callbackFn(null);
      }
    });
  };

  const registerWithUsernameAndPassword = (
    username,
    password,
    email,
    callbackFn = null
  ) => {
    register(username, password, email).then((data) => {
      if (data.error) {
        if (callbackFn) {
          return callbackFn(data.error);
        }
      }

      setUser(data);

      if (callbackFn) {
        return callbackFn(null);
      }
    });
  };

  return {
    user,
    loginWithUsernameAndPassword,
    registerWithUsernameAndPassword,
  };
}

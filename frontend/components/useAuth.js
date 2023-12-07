import { useState } from "react";
import { signIn } from "./apiCalls";

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

  return { user, loginWithUsernameAndPassword };
}

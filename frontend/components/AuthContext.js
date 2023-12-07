import { createContext, useState, useEffect } from "react";

import { signIn, register } from "./apiCalls";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginWithUsernameAndPassword = (
    username,
    password,
    callbackFn = null
  ) => {
    signIn(username, password).then((data) => {
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

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithUsernameAndPassword,
        registerWithUsernameAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

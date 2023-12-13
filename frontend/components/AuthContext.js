import { createContext, useState, useEffect } from "react";

import { signIn, register, updateUser } from "./apiCalls";

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

  const updateUserData = (username, email, password, callbackFn = null) => {
    updateUser(user.userid, username, email, password).then((data) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithUsernameAndPassword,
        registerWithUsernameAndPassword,
        signOut,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

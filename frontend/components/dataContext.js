import { useState, createContext } from "react";
import { getRandomPrompt, postResponse, postAddFriend } from "./apiCalls";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [todayPrompt, setTodayPrompt] = useState(null);

  const addFriend = (userId, usernameOrEmail, callbackFn = null) => {
    postAddFriend(userId, usernameOrEmail).then((data) => {
      if (data.error) {
        if (callbackFn) {
          return callbackFn(data.error);
        }
      } else {
        if (callbackFn) {
          return callbackFn(null);
        }
      }
    });
  };

  const getTodayPrompt = (callbackFn = null) => {
    getRandomPrompt().then((data) => {
      setTodayPrompt(data);
      if (callbackFn) {
        return callbackFn(null);
      }
    });
  };

  const submitResponse = (
    userId,
    promptId,
    answer,
    visibility,
    callbackFn = null
  ) => {
    postResponse(userId, promptId, answer, visibility).then((data) => {
      if (data.error) {
        if (callbackFn) {
          return callbackFn(data.error);
        }
      }

      if (callbackFn) {
        return callbackFn(null);
      }
    });
  };

  return (
    <DataContext.Provider
      value={{
        todayPrompt,
        setTodayPrompt,
        getTodayPrompt,
        submitResponse,
        addFriend,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

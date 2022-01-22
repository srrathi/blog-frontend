import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import jwt_decode from "jwt-decode";

const INITIAL_STATE = {
  user: localStorage.getItem("userToken")
    ? jwt_decode(localStorage.getItem("userToken"))
    : null,
  isFetching: false,
  error: false,
  token: localStorage.getItem("userToken") || "",
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("userToken", state.token);
  }, [state.user, state.token]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

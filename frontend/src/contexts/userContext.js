import React, { createContext, useContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const actionTypes = {
  REGISTRATION_START: "REGISTRATION_START",
  REGISTRATION_FAIL: "REGISTRATION_FAIL",
  REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
  LOGIN_START: "LOGIN_START",
  LOGIN_FAIL: "LOGIN_FAIL",
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

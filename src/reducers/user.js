import axios from "axios";

export const initialState = {
  isLoggingIn: false, // 로그인 시도중 loading
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도중 loading
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: "LOG_OUT_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "Yangwoo" },
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
      };
    case "LOG_IN_FAILURE":
      return { ...state, isLoggingIn: false, isLoggedIn: true, me: action.data };
    case "LOG_OUT_REQUEST":
      return { ...state, isLoggingOut: true };
    case "LOG_OUT_SUCCESS":
      return { ...state, isLoggingOut: false, isLoggedIn: false, me: null };
    case "LOG_OUT_FAILURE":
      return { ...state, isLoggingOut: false, isLoggedIn: false };
    default:
      return state;
  }
};

export default reducer;

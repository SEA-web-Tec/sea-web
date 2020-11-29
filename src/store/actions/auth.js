import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch(authSuccess(token, user));
    }
  };
};

export const auth = (correo, contrasenia) => {
  return (dispatch) => {
    dispatch(authStart());

    let url = "/auth/login";
    const authData = {
      correo: correo,
      contrasenia: contrasenia
    };

    http
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        dispatch(authSuccess(response.data.token, response.data.user));
      })
      .catch((error) => {
        dispatch(authFail(error.response ? error.response.data.message : "Ha ocurrido un error, intenta nuevamente"));
      });
  };
};

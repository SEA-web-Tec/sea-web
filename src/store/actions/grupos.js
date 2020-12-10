import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchGruposStart = () => {
  return {
    type: actionTypes.FETCH_GRUPOS_START
  };
};

export const fetchGruposSuccess = (grupos) => {
  return {
    type: actionTypes.FETCH_GRUPOS_SUCCESS,
    grupos: grupos
  };
};

export const fetchGruposFail = (error) => {
  return {
    type: actionTypes.FETCH_GRUPOS_FAIL,
    error: error
  };
};

export const gruposDismissError = () => {
  return {
    type: actionTypes.GRUPOS_DISMISS_ERROR
  };
};

export const fetchGrupos = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchGruposStart());

    let url = "/grupos/";
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http
      .get(url + userId, authData)
      .then((response) => {
        dispatch(fetchGruposSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchGruposFail(error.message));
      });
  };
};

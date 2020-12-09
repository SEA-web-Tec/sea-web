import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchGruposStart = () => {
  return {
    type: actionTypes.FETCH_GRUPOS_START
  };
};

export const fetchGruposSuccess = (cursos) => {
  return {
    type: actionTypes.FETCH_GRUPOS_SUCCESS,
    cursos: cursos
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
      headers: {
        token: token
      }
    };

    http
      .get(url + userId, authData)
      .then((response) => {
        const fetchedGrupos = [];
        for (const key in response.data) {
          fetchedGrupos.push({ ...response.data[key], id: key });
        }
        dispatch(fetchGruposSuccess(fetchedGrupos));
      })
      .catch((error) => {
        dispatch(fetchGruposFail(error.message));
      });
  };
};

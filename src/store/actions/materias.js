import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchMateriasSuccess = (materias) => {
  return {
    type: actionTypes.FETCH_MATERIAS_SUCCESS,
    materias: materias
  };
};

export const fetchMaterias = (token) => {
  return (dispatch) => {
    let url = "/materias";
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http.get(url, authData).then((response) => {
      dispatch(fetchMateriasSuccess(response.data));
    });
  };
};

export const fetchMateriasConGrupo = (token) => {
  return (dispatch) => {
    let url = "/materias/con-grupo";
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http.get(url, authData).then((response) => {
      dispatch(fetchMateriasSuccess(response.data));
    });
  };
};

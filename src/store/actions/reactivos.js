import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchReactivosSuccess = (reactivos) => {
  return {
    type: actionTypes.FETCH_REACTIVOS_SUCCESS,
    reactivos: reactivos
  };
};

export const fetchReactivosSpecific = (token, materia, unidad) => {
  return (dispatch) => {
    let url = `/reactivos/${materia}/${unidad}`;
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http.get(url, authData).then((response) => {
      dispatch(fetchReactivosSuccess(response.data));
    });
  };
};

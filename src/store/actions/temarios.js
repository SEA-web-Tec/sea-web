import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchTemariosSuccess = (temarios) => {
  return {
    type: actionTypes.FETCH_TEMARIOS_SUCCESS,
    temarios: temarios
  };
};

export const fetchTemarios = (token) => {
  return (dispatch) => {
    let url = "/temarios";
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http.get(url, authData).then((response) => {
      dispatch(fetchTemariosSuccess(response.data));
    });
  };
};

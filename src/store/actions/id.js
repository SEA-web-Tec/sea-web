import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const idStart = () => {
  return {
    type: actionTypes.ID_START,
  };
};

export const idSetInicial = (id_ins, no_unidades) => {
  return {
    type: actionTypes.ID_SETINICIAL,
    id_ins: id_ins,
    no_unidades: no_unidades,
  };
};

export const idSetAll = (
  id_ins,
  no_unidades,
  indicadoresalcance,
  unidades,
  evidencias,
  ponderacion
) => {
  return {
    type: actionTypes.ID_SETALL,
    id_ins: id_ins,
    no_unidades: no_unidades,
    indicadoresalcance: indicadoresalcance,
    unidades: unidades,
    evidencias: evidencias,
    ponderacion: ponderacion,
  };
};

export const idFail = (error) => {
  return {
    type: actionTypes.ID_FAIL,
    error: error,
  };
};

/*export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: actionTypes.ID_LOGOUT,
  };
};*/ //Guardar

export const idCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch(idSuccess(token, user));
    }
  };
};

export const idBusqueda = (usuario_id, grupo_id) => {
  return (dispatch) => {
    dispatch(idStart());

    let url = "/instrumentaciondidactica/crear";
    const idData = {
      usuario_id: usuario_id,
      grupo_id: grupo_id,
    };

    http
      .post(url, idData)
      .then((response) => {
        url = "/evidenciasaprendizaje/consulta";
        idData = { id_ins: response.data.id };
        if (response.data.unidades == []) {
          dispatch(
            idSetInicial(response.data.id_ins, response.data.no_unidades)
          );
        } else {
          http.get(url, idData).then((response1) => {
            dispatch(
              idSetAll(
                response.data.id_ins,
                response.data.no_unidades,
                response1.data.indicadoresalcance,
                response1.data.unidades,
                response1.data.evidencias,
                response1.data.indicadoresponderacion
              )
            );
          });
        }

        //localStorage.setItem("token", response.data.token);
        //localStorage.setItem("user", JSON.stringify(response.data.user));

        //dispatch(idSuccess(response.data.token, response.data.user));
      })
      .catch((error) => {
        dispatch(
          idFail(
            error.response
              ? error.response.data.message
              : "Ha ocurrido un error, intenta nuevamente"
          )
        );
      });
  };
};

export const idIngresar = (
  id_ins,
  no_unidades,
  indicadoresalcance,
  unidades,
  evidencias,
  ponderacion
) => {
  return (dispatch) => {
    dispatch(idStart());

    let url = "/instrumentaciondidactica/crear";
    const idData = {
      usuario_id: usuario_id,
      grupo_id: grupo_id,
    };

    http
      .post(url, idData)
      .then((response) => {
        url = "/evidenciasaprendizaje/consulta";
        idData = { id_ins: response.data.id };
        if (response.data.unidades == []) {
          dispatch(
            idSetInicial(response.data.id_ins, response.data.no_unidades)
          );
        } else {
          http.get(url, idData).then((response1) => {
            dispatch(
              idSetAll(
                response.data.id_ins,
                response.data.no_unidades,
                response1.data.indicadoresalcance,
                response1.data.unidades,
                response1.data.evidencias,
                response1.data.indicadoresponderacion
              )
            );
          });
        }

        //localStorage.setItem("token", response.data.token);
        //localStorage.setItem("user", JSON.stringify(response.data.user));

        //dispatch(idSuccess(response.data.token, response.data.user));
      })
      .catch((error) => {
        dispatch(
          idFail(
            error.response
              ? error.response.data.message
              : "Ha ocurrido un error, intenta nuevamente"
          )
        );
      });
  };
};

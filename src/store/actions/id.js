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
    indicadoresalcance: [],
    unidades: [],
    evidencias: [],
    indicadoresponderacion: [],
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
}; /*export const idCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch(idSuccess(token, user));
    }
  };
};*/ //Guardar

/*export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: actionTypes.ID_LOGOUT,
  };
};*/ export const idBusqueda = (
  usuario_id,
  grupo_id
) => {
  return (dispatch) => {
    dispatch(idStart());

    let url = "/instrumentaciondidactica/crear";
    const idData = {
      grupo_id: grupo_id,
      usuario_id: usuario_id,
    };
    console.log("antes");

    http
      .post(url, idData)
      .then((response) => {
        console.log(response.data.unidades);
        if (response.data.unidades.length == "0") {
          console.log("opcion 1");
          dispatch(
            idSetInicial(
              response.data.intrumentacion.id,
              response.data.no_unidades
            )
          );
        } else {
          const url =
            "/evidenciasaprendizaje/consulta/" +
            response.data.intrumentacion.id;
          const idData2 = { id_ins: response.data.intrumentacion.id };
          console.log(idData2);
          http.get(url, idData2).then((response1) => {
            console.log(response1.data);
            console.log("el2");

            dispatch(
              idSetAll(
                response.data.intrumentacion.id,
                response.data.no_unidades,
                response1.data.indicadoresalcance,
                response.data.unidades,
                response1.data.evidencia,
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
        console.log("error?");
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
  indicadoresalcance,
  unidades,
  evidencias,
  ponderacion
) => {
  return (dispatch) => {
    dispatch(idStart());

    let url = "/instrumentaciondidacticaunidad/crear";
    const idData = {
      unidades: unidades,
    };

    //unidades
    http
      .post(url, idData)
      .then((response) => {
        //indicadores alcance
        console.log("1");
        const idData = {
          //revisar si tiene unidad
          id_ins: id_ins,
          indicadoresalcance: indicadoresalcance,
        };
        console.log(idData);
        url = "/indicadoresalcance/crear";
        http.post(url, idData).then((response) => {
          //matriz ponderacion evidencias
          console.log("2");
          const idData = {
            //revisar si tiene unidad
            evidencias: evidencias,
            indicadorponderacion: ponderacion,
          };
          console.log(idData);
          url = "/evidenciasaprendizaje/crear";
          http.post(url, idData).then((response) => {
            console.log("3");
            console.log("Ta okey");
          });
        });
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

import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const idStart = () => {
  return {
    type: actionTypes.ID_START,
  };
};

export const idSetInicial = (id_ins, no_unidades, estado, comentario) => {
  return {
    type: actionTypes.ID_SETINICIAL,
    id_ins: id_ins,
    no_unidades: no_unidades,
    indicadoresalcance: [],
    unidades: [],
    evidencias: [],
    indicadoresponderacion: [],
    ponderacion: [],
    estado: estado,
    comentario: comentario,
  };
};

export const idSetAll = (
  id_ins,
  no_unidades,
  indicadoresalcance,
  unidades,
  evidencias,
  ponderacion,
  estado,
  comentario
) => {
  return {
    type: actionTypes.ID_SETALL,
    id_ins: id_ins,
    no_unidades: no_unidades,
    indicadoresalcance: indicadoresalcance,
    unidades: unidades,
    evidencias: evidencias,
    ponderacion: ponderacion,
    estado: estado,
    comentario: comentario,
  };
};

export const idSetInstrumentaciones = (intrumentaciones) => {
  return {
    type: actionTypes.ID_SETINSTRUMENTACIONES,
    intrumentaciones: intrumentaciones,
  };
};

export const idFail = (error) => {
  return {
    type: actionTypes.ID_FAIL,
    error: error,
  };
};

export const idBusqueda = (usuario_id, grupo_id) => {
  return (dispatch) => {
    dispatch(idStart());

    let url = "/instrumentaciondidactica/crear";
    const idData = {
      grupo_id: grupo_id,
      usuario_id: usuario_id,
    };
    http
      .post(url, idData)
      .then((response) => {
        if (response.data.unidades.length == "0") {
          console.log(response.data.intrumentacion);
          dispatch(
            idSetInicial(
              response.data.intrumentacion.id,
              response.data.no_unidades,
              response.data.intrumentacion.estado,
              response.data.intrumentacion.comentario
            )
          );
        } else {
          const url =
            "/evidenciasaprendizaje/consulta/" +
            response.data.intrumentacion.id;
          const idData2 = { id_ins: response.data.intrumentacion.id };
          http.get(url, idData2).then((response1) => {
            dispatch(
              idSetAll(
                response.data.intrumentacion.id,
                response.data.no_unidades,
                response1.data.indicadoresalcance,
                response.data.unidades,
                response1.data.evidencia,
                response1.data.indicadoresponderacion,
                response.data.intrumentacion.estado,
                response.data.intrumentacion.comentario
              )
            );
          });
        }
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

//Para el evaluar
export const idBusquedaAll = () => {
  return (dispatch) => {
    dispatch(idStart());
    let url = "/instrumentaciondidactica/consulta_intrumentaciones";
    const idData = {};
    http.get(url, idData).then((response) => {
      console.log(response.data);
      dispatch(idSetInstrumentaciones(response.data));
    });
  };
};

export const idBusquedaIndividual = (id_ins) => {
  return (dispatch) => {
    dispatch(idStart());
    let url = "/instrumentaciondidactica/buscar_intrumentacion/" + id_ins;
    const idData = {
      id_ins: id_ins,
    };
    http
      .get(url, idData)
      .then((response) => {
        const url = "/evidenciasaprendizaje/consulta/" + id_ins;
        const idData2 = { id_ins: id_ins };
        http.get(url, idData2).then((response1) => {
          dispatch(
            idSetAll(
              id_ins,
              response.data.no_unidades,
              response1.data.indicadoresalcance,
              response.data.unidades,
              response1.data.evidencia,
              response1.data.indicadoresponderacion,
              response.data.intrumentacion.estado,
              response.data.intrumentacion.comentario
            )
          );
        });
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

export const idEvaluar = (id_ins, comentario) => {
  return (dispatch) => {
    dispatch(idStart());

    const url = "/instrumentaciondidactica/evaluar";
    const idData = {
      id_ins: id_ins,
      comentario: comentario,
    };

    //unidades
    console.log("estoy fuera");
    http
      .post(url, idData)
      .then((response) => {
        console.log("Intrumentacion evaluada correctamente");
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
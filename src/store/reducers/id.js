import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  id_ins: null,
  intrumentaciones: null,
  no_unidades: null,
  indicadoresalcance: null,
  unidades: null,
  evidencias: null,
  ponderacion: null,
  indicadoresponderacion: null,
  estado: null,
  comentario: null,
  error: null,
  loading: false,
};

const idStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const idSetInicial = (state, action) => {
  return updateObject(state, {
    id_ins: action.id_ins,
    no_unidades: action.no_unidades,
    indicadoresalcance: action.indicadoresalcance,
    unidades: action.unidades,
    evidencias: action.evidencias,
    indicadoresponderacion: action.indicadoresponderacion,
    estado: action.estado,
    comentario: action.comentario,
    error: null,
    loading: false,
  });
};

const idSetAll = (state, action) => {
  return updateObject(state, {
    id_ins: action.id_ins,
    no_unidades: action.no_unidades,
    indicadoresalcance: action.indicadoresalcance,
    unidades: action.unidades,
    evidencias: action.evidencias,
    ponderacion: action.ponderacion,
    estado: action.estado,
    comentario: action.comentario,
    error: null,
    loading: false,
  });
};

const idSetIntrumentaciones = (state, action) => {
  return updateObject(state, {
    intrumentaciones: action.intrumentaciones,
    error: null,
    loading: false,
  });
};

const idFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

/*const idLogout = (state, action) => {
  return updateObject(state, { token: null, user: null });
};*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ID_START:
      return idStart(state, action);
    case actionTypes.ID_SETINICIAL:
      return idSetInicial(state, action);
    case actionTypes.ID_SETALL:
      return idSetAll(state, action);
    case actionTypes.ID_FAIL:
      return idFail(state, action);
    case actionTypes.ID_SETINSTRUMENTACIONES:
      return idSetIntrumentaciones(state, action);
    /*case actionTypes.ID_LOGOUT:
      return idLogout(state, action);*/
    default:
      return state;
  }
};

export default reducer;

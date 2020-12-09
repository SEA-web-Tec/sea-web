import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  id_ins: null,
  no_unidades:null,
  indicadoresalcance:null,
  unidades:null,
  evidencias: null,
  indicadoresponderacion: null,
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
    /*case actionTypes.ID_LOGOUT:
      return idLogout(state, action);*/
    default:
      return state;
  }
};

export default reducer;

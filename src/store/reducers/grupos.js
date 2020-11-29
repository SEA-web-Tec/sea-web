import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  grupos: [],
  error: null,
  hasError: false,
  loading: false
};

const fetchGruposStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchGruposSuccess = (state, action) => {
  return updateObject(state, { grupos: action.grupos, error: null, hasError: false, loading: false });
};

const fetchGruposFail = (state, action) => {
  return updateObject(state, { error: action.error, hasError: true, loading: false });
};

const gruposDismissError = (state, action) => {
  return updateObject(state, { hasError: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GRUPOS_START:
      return fetchGruposStart(state, action);
    case actionTypes.FETCH_GRUPOS_SUCCESS:
      return fetchGruposSuccess(state, action);
    case actionTypes.FETCH_GRUPOS_FAIL:
      return fetchGruposFail(state, action);
    case actionTypes.GRUPOS_DISMISS_ERROR:
      return gruposDismissError(state, action);
    default:
      return state;
  }
};

export default reducer;

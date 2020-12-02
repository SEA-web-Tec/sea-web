import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  user: null,
  error: null,
  hasError: false,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    hasError: false,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, hasError: true, loading: false });
};

const authDismissError = (state, action) => {
  return updateObject(state, { hasError: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, user: null });
};

const fetchPerfilStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchPerfilSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false
  });
};

const fetchPerfilFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const perfilDismissError = (state, action) => {
  return updateObject(state, { hasError: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_DISMISS_ERROR:
      return authDismissError(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FETCH_PERFIL_START:
      return fetchPerfilStart(state, action);
    case actionTypes.FETCH_PERFIL_SUCCESS:
      return fetchPerfilSuccess(state, action);
    case actionTypes.FETCH_PERFIL_FAIL:
      return fetchPerfilFail(state, action);
    case actionTypes.PERFIL_DISMISS_ERROR:
      return perfilDismissError(state, action);
    default:
      return state;
  }
};

export default reducer;

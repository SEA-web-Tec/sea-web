import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  materias: []
};

const fetchMateriasSuccess = (state, action) => {
  return updateObject(state, {
    materias: action.materias
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATERIAS_SUCCESS:
      return fetchMateriasSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

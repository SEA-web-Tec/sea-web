import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  reactivos: []
};

const fetchReactivosSuccess = (state, action) => {
  return updateObject(state, {
    reactivos: action.reactivos
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REACTIVOS_SUCCESS:
      return fetchReactivosSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

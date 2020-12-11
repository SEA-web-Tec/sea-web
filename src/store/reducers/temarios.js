import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  temarios: []
};

const fetchTemariosSuccess = (state, action) => {
  return updateObject(state, {
    temarios: action.temarios
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEMARIOS_SUCCESS:
      return fetchTemariosSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

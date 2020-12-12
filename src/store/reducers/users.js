import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  users: []
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

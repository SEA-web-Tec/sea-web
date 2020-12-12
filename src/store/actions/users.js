import { http } from "shared/http";
import * as actionTypes from "./actionTypes";

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  };
};

export const fetchUsers = (token) => {
  return (dispatch) => {
    let url = "/usuarios";
    const authData = {
      headers: { Authorization: `Bearer ${token}` }
    };

    http.get(url, authData).then((response) => {
      dispatch(fetchUsersSuccess(response.data));
    });
  };
};

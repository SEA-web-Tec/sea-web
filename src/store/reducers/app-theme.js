import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "shared/utility";

const initialState = {
  palette: {
    type: "light",
    primary: {
      main: "#3F51B5",
      dark: "#303F9F",
      light: "#C5CAE9"
    },
    secondary: {
      main: "#FF5722",
      dark: "#FF5722"
    }
  }
};

const toggleDarkMode = (state, action) => {
  return updateObject(state, {
    palette: {
      ...state.palette,
      type: state.palette.type === "light" ? "dark" : "light"
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DARK_MODE:
      return toggleDarkMode(state, action);
    default:
      return state;
  }
};

export default reducer;

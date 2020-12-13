import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "shared/utility";
import { width as right } from "components/Layout/BarraUtilidades/Styles";

const newPrimaryMain = "#3F51B5";
const newSecondaryMain = "#FF5722";

const initialState = {
  overrides: {
    // MuiPickersToolbar: {
    //     toolbar: {
    //         backgroundColor: newSecondaryMain,
    //     },
    // },
    MuiFabPrimary: {
      backgroundColor: newSecondaryMain,
    },
    MuiPickersCalendar: {
      week: {
        justifyContent: "inherit",
        width: right,
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        width: right,
        minWidth: "inherit",
      },
    },
    MuiPickersDay: {
      day: {
        width: "32px",
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: newPrimaryMain,
      dark: "#303F9F",
      light: "#C5CAE9",
    },
    secondary: {
      main: newSecondaryMain,
      dark: "#FF5722",
    },
  },
};

const toggleDarkMode = (state, action) => {
  return updateObject(state, {
    palette: {
      ...state.palette,
      type: state.palette.type === "light" ? "dark" : "light",
    },
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

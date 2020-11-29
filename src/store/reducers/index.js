import { combineReducers } from "redux";

import authReducer from "./auth";
import gruposReducer from "./grupos";
import appThemeReducer from "./app-theme";

const rootReducer = combineReducers({
  auth: authReducer,
  appTheme: appThemeReducer,
  grupos: gruposReducer
});

export default rootReducer;

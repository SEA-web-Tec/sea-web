import { combineReducers } from "redux";

import authReducer from "./auth";
import gruposReducer from "./grupos";
import appThemeReducer from "./app-theme";
import idReducer from "./id";


const rootReducer = combineReducers({
  auth: authReducer,
  appTheme: appThemeReducer,
  grupos: gruposReducer,
  id: idReducer,
});

export default rootReducer;

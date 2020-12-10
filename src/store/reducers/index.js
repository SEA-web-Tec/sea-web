import { combineReducers } from "redux";

import authReducer from "./auth";
import gruposReducer from "./grupos";
import appThemeReducer from "./app-theme";
import idReducer from "./id";
import temariosReducer from "./temarios";
import materiasReducer from "./materias";

const rootReducer = combineReducers({
  auth: authReducer,
  appTheme: appThemeReducer,
  grupos: gruposReducer,
  id: idReducer,
  temarios: temariosReducer,
  materias: materiasReducer
});

export default rootReducer;

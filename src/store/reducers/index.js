import { combineReducers } from "redux";

import authReducer from "./auth";
import gruposReducer from "./grupos";
import appThemeReducer from "./app-theme";
import idReducer from "./id";
import temariosReducer from "./temarios";
import materiasReducer from "./materias";
import usersReducer from "./users";
import reactivosReducer from "./reactivos";

const rootReducer = combineReducers({
  auth: authReducer,
  appTheme: appThemeReducer,
  grupos: gruposReducer,
  id: idReducer,
  temarios: temariosReducer,
  materias: materiasReducer,
  users: usersReducer,
  reactivos: reactivosReducer
});

export default rootReducer;

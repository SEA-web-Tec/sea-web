import { combineReducers } from "redux";

import authReducer from "./auth";
import appThemeReducer from "./app-theme";
import cursoReducer from "./curso";
 
const rootReducer = combineReducers({
    auth: authReducer,
    appTheme: appThemeReducer,
    curso: cursoReducer,
});

export default rootReducer;
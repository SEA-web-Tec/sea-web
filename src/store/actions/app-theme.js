import * as actionTypes from "./actionTypes";

export const toggleDarkMode = (payload) => {
    return { type: actionTypes.TOGGLE_DARK_MODE, payload };
};

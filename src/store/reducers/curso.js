import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    cursos: [],
    loading: false,
};

const cursoStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const cursoSuccess = (state, action) => {
    return updateObject(state, { cursos: action.cursos, loading: false });
};

const cursoFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CURSOS_START:
            return cursoStart(state, action);
        case actionTypes.FETCH_CURSOS_SUCCESS:
            return cursoSuccess(state, action);
        case actionTypes.FETCH_CURSOS_FAIL:
            return cursoFail(state, action);
        default:
            return state;
    }
};

export default reducer;

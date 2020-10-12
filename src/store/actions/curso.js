import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchCursosStart = () => {
    return {
        type: actionTypes.FETCH_CURSOS_START,
    };
};

export const fetchCursosSuccess = (cursos) => {
    return {
        type: actionTypes.FETCH_CURSOS_SUCCESS,
        cursos: cursos,
    };
};

export const fetchCursosFail = (error) => {
    return {
        type: actionTypes.FETCH_CURSOS_FAIL,
        error: error,
    };
};

export const fetchCursos = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchCursosStart());

        axios
            .get("https://sea-nightlyflux.firebaseio.com/cursos.json")
            .then((response) => {
                const fetchedCursos = [];
                for (const key in response.data) {
                    fetchedCursos.push({ ...response.data[key], id: key });
                }
                dispatch(fetchCursosSuccess(fetchedCursos));
            })
            .catch((error) => {
                dispatch(fetchCursosFail(error));
            });
    };
};

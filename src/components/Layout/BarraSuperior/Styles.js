import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    titulo: {
        marginLeft: 36,
    },
    toolbar: {
        paddingRight: "0px",
    },
    opciones: {
        width: "fit-content",
        flex: 1,
        textAlign: "right",
        marginRight: "5px",
    },
}));

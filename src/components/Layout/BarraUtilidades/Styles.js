import { makeStyles } from "@material-ui/core";

const top = 64; // es igual a la altura del Appbar superior, definida en el estándar de Material-UI.
export const width = 256; // es solo un valor albitrario; es redondo y se ve bien, sin más.

export const useStyles = makeStyles((theme) => {
    return {
        drawer: {
            position: "fixed",
        },
        drawerPaper: {
            overflowY: "auto",
            width: width,
            top: top,
            [theme.breakpoints.down("sm")]: {
                display: "none",
            },
        },
        menuInferior: {},
    };
});

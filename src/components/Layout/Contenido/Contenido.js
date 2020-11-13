import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { width as right } from "components/Layout/BarraUtilidades/Styles";

const Contenido = (props) => {
    const useStyles = makeStyles((theme) => {
        const left = theme.spacing(7) + 1; // es igual a la longitud del Drawer colapsado, definida en el estándar de Material-UI.
        const top = 64; // es igual a la altura del Appbar superior, definida en el estándar de Material-UI.
        const bottom = 50; // es igual a la altura del BottomNavigation, definida en el estándar de Material-UI.

        return {
            contenido: {
                padding: "0px",
                [theme.breakpoints.up("sm")]: {
                    marginLeft: theme.spacing(4) + left,
                    marginRight: theme.spacing(4) + right,
                    marginTop: theme.spacing(4) + top,
                    marginBottom: theme.spacing(4),
                },
                [theme.breakpoints.down("sm")]: {
                    marginRight: theme.spacing(4),
                    marginBottom: bottom,
                },
                [theme.breakpoints.down("xs")]: {
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginTop: top,
                },
            },
        };
    });

    const classes = useStyles();

    return <main className={classes.contenido}>{props.children}</main>;
};

export default Contenido;

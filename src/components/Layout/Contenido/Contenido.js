import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Contenido = (props) => {
    const useStyles = makeStyles((theme) => ({
        content: {
            marginLeft: 0,
            marginTop: props.marginTop,
            flexGrow: 1,
            padding: theme.spacing(5),
            [theme.breakpoints.up("sm")]: {
                marginLeft: "57px",
            },
            [theme.breakpoints.down("xs")]: {
                padding: 0,
            },
        },
    }));

    const classes = useStyles();

    return <main className={classes.content}>{props.children}</main>;
};

export default Contenido;

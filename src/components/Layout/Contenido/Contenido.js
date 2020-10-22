import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Contenido = (props) => {
  const useStyles = makeStyles((theme) => ({
    content: {
      marginLeft: 0,
      marginTop: props.marginTop,
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        marginLeft: "57px"
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: props.marginTop - 8,
        padding: 0
      }
    }
  }));

  const classes = useStyles();

  return <main className={classes.content}>{props.children}</main>;
};

export default Contenido;
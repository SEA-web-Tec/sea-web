import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const Contenido = (props) => {
  const useStyles = makeStyles((theme) => ({
    content: {
      marginLeft: 0,
      marginTop: props.marginTop,
      flexGrow: 1,
      padding: theme.spacing(5),
      [theme.breakpoints.up("sm")]: {
        marginLeft: "57px"
      },
      [theme.breakpoints.down("xs")]: {
        padding: 0
      }
    },
    isLogin: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: 0
      }
    }
  }));

  const classes = useStyles();

  return <main className={props.isLogin ? clsx([classes.content, classes.isLogin]) : classes.content}>{props.children}</main>;
};

export default Contenido;

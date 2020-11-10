import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./ListItem.styles";
import letterValue from "shared/LetterValue";

const ListItemEdit = (props) => {
  const classes = useStyles();
  var iconSelected = "";
  var styleSelected = "";
  if (props.label === props.ultimo) {
    styleSelected = classes.addCircle;
    iconSelected = (
      <IconButton className={styleSelected} onClick={props.crear}>
        <AddCircleIcon />
      </IconButton>
    );
  } else {
    styleSelected = classes.addCancel;
    iconSelected = (
      <IconButton className={styleSelected} onClick={props.eliminar}>
        <CancelIcon />
      </IconButton>
    );
  }
  var mostrar = "";
  if (props.mayus === true) mostrar = letterValue(props.label);
  else mostrar = props.label;

  return (
    <div className={classes.ListItem}>
      <div className={classes.Label}>
        <Typography>{mostrar}</Typography>
      </div>
      <div className={classes.Content}>
        {props.children}
        {iconSelected}
      </div>
    </div>
  );
};

export default ListItemEdit;

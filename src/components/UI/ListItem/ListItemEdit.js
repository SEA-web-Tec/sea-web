import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./ListItem.styles";

function letterValue(str) {
  var anum = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };
  return anum[str];
}

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

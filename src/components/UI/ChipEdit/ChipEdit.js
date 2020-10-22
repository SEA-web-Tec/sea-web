import React from "react";
import clsx from "clsx";
import useStyles from "./ChipEdit.styles";
import "./ChipEdit.css"

import {
  Typography,
  Select,
} from "@material-ui/core";

const ChipEdit = (props) => {
  const classes = useStyles();
  var opciones = props.numeros.map((numero) => {
  return <option value={numero} key={numero}>{numero}</option>;
  });
  return (
    <div
      className={clsx(classes.semanasChip, "semanasRadius")}
      style={{ variant: "outlined" }}
    >
      <div className={clsx(classes.avatarSize, "avatarSize2")}>
        <Select
          disableUnderline
          id="select"
          className={clsx("selectSize")}
          defaultValue="1"
          onChange={props.cambiar}
        >
          {opciones}
        </Select>
      </div>
      <Typography className={clsx(classes.titulo, "fuente")} color="primary">
        {props.label}
      </Typography>
    </div>
  );
}

export default ChipEdit

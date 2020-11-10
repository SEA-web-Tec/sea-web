import React from "react";
import { Box, InputBase } from "@material-ui/core";

const tituloColumnaInstrumento = (props) => {
  let color = "";
  switch (props.titulo) {
    case "Excelente":
      color = "#00F";
      break;
    case "Si":
      color = "#0F0";
      break;
    case "Bueno":
      color = "#0F0";
      break;
    case "Regular":
      color = "#FF0";
      break;
    case "Suficiente":
      color = "#FF8000";
      break;
    case "Insuficiente":
      color = "#F00";
      break;
    case "No":
      color = "#F00";
      break;
    default:
      color = "primary.main";
      break;
  }
  return (
    <Box borderRadius="borderRadius" bgcolor={color} pt={2} p={1} boxShadow={2}>
      <InputBase
        //fullWidth
        //variant="standard"
        value={props.titulo}
        onChange={props.cambioTitulo}
      />
    </Box>
  );
};

export default tituloColumnaInstrumento;

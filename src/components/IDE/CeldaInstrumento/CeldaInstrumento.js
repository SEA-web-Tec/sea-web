import React from "react";
import { Box, TextField } from "@material-ui/core";

const celdaInstrumento = (props) => {
  const visibility = props.cabecera ? "hidden" : "visible";
  /*const number = props.number ? (
    <TextField
      type="number"
      InputProps={{ inputProps: { min: 0, max: 100 } }}
      value={props.number}
      onChange={props.cambioNumber}
      style={{ visibility: visibility }}
    />
  ) : null;*/
  return (
    <Box boxShadow={2} display="flex" flexDirection="column">
      <TextField
        label={props.nombre}
        multiline
        fullWidth
        rows={5}
        variant="outlined"
        value={props.texto}
        onChange={props.cambio}
      />
      <TextField
        type="number"
        InputProps={{ inputProps: { min: 0, max: 100 } }}
        value={props.number}
        onChange={props.cambioNumber}
        style={{ visibility: visibility }}
      />
    </Box>
  );
};


export default celdaInstrumento;

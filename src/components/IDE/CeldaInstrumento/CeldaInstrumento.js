import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@material-ui/core";

const celdaInstrumento = (props) => {
  const number = props.number ? (
    <TextField
      type="number"
      value={props.valor}
      onChange={props.cambioNumber}
    />
  ) : null;
  return (
    <Box boxShadow={2} display="flex"  flexDirection="column">
      <TextField
        label={props.nombre}
        multiline
        fullWidth
        rows={5}
        variant="outlined"
        value={props.texto}
        onChange={props.cambio}
      />
      {number}
    </Box>
  );
};

celdaInstrumento.propTypes = {};

export default celdaInstrumento;

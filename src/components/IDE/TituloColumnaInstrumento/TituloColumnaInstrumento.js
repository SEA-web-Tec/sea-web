import React from "react";
import { Box, TextField } from "@material-ui/core";

const tituloColumnaInstrumento = (props) => {
  return (
    <Box
      borderRadius="borderRadius"
      bgcolor="primary.main"
      pt={2}
      p={1}
      boxShadow={2}
    >
      <TextField
        fullWidth
        value={props.titulo}
      />
    </Box>
  );
};

export default tituloColumnaInstrumento;

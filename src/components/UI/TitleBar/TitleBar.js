import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

const TitleBar = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius="borderRadius"
      bgcolor="primary.main"
      pt={5}
      p={1}

    >

      <Typography display="block" variant="h5" color="textPrimary">
        {props.titulo}
      </Typography>

      <Typography display="block" variant="body1" color="textPrimary">
        {props.descripcion}
      </Typography>
    </Box>
  );
};

TitleBar.propTypes = {};

export default TitleBar;

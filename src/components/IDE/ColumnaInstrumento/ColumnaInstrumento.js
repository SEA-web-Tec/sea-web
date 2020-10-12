import React from "react";
import PropTypes from "prop-types";
import CeldaInstrumento from "../CeldaInstrumento/CeldaInstrumento";
import Grid from "@material-ui/core/Grid";
import TituloColumnaInstrumento from '../TituloColumnaInstrumento/TituloColumnaInstrumento';

const columnaInstrumento = (props) => {
  const celdas = props.celdas.map((celda) => (
    <Grid item xs={12} key={celda.id}>
      <CeldaInstrumento
        texto={celda.texto}
        cambio={(event) => props.cambio(event,celda.id)}
        number={props.number}
      />
    </Grid>
  ));

  return (
    <Grid container direction="column" spacing={2} >
      <Grid item >
        <TituloColumnaInstrumento titulo={props.titulo} />
      </Grid>
      {celdas}
    </Grid>
  );
};

columnaInstrumento.propTypes = {};

export default columnaInstrumento;

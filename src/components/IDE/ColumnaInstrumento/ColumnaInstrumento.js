import React from "react";
import CeldaInstrumento from "../CeldaInstrumento/CeldaInstrumento";
import Grid from "@material-ui/core/Grid";
import TituloColumnaInstrumento from '../TituloColumnaInstrumento/TituloColumnaInstrumento';

const columnaInstrumento = (props) => {
  const celdas = props.celdas.map((celda) => (
    <Grid item xs={12} key={celda.id}>
      <CeldaInstrumento
        texto={celda.texto ? celda.texto:celda.criterio}
        cambio={(event) => props.cambio(event,celda.id)}
        number={celda.puntos_max}
        cambioNumber={(event) => props.cambioNumber(event,celda.id)}
        cabecera={props.cabecera}
      />
    </Grid>
  ));

  return (
    <Grid container direction="column" spacing={2} >
      <Grid item >
        <TituloColumnaInstrumento titulo={props.titulo} cambioTitulo={(event) => props.cambioTitulo(event,props.cabeceraId)} />
      </Grid>
      {celdas}
    </Grid>
  );
};


export default columnaInstrumento;

import React from "react";
import OpcionesRenglon from "../OpcionesRenglon/OpcionesRenglon";
import Grid from "@material-ui/core/Grid";
import TituloColumnaInstrumento from "../TituloColumnaInstrumento/TituloColumnaInstrumento";

const columnaOpcionesInstrumento = (props) => {
  const opciones = [];
  for (let index = 0; index < props.cantidad; index++) {
    opciones.push(
      <Grid item xs={12} sm key={index}>
        <OpcionesRenglon
          onClickSubir={(event) => props.onClickSubir(event, index + 1)}
          onClickBajar={(event) => props.onClickBajar(event, index + 1)}
          onClickEliminar={(event) => props.onClickEliminar(event, index + 1)}
        />
      </Grid>
    );
  }
  return (
    <Grid container direction="column">
      <TituloColumnaInstrumento
        titulo="Opciones"
        cambioTitulo={(event) => props.cambioTitulo(event, props.cabeceraId)}
      />
      {opciones}
    </Grid>
  );
};

export default columnaOpcionesInstrumento;

import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ColumnaInstrumento from "../../components/IDE/ColumnaInstrumento/ColumnaInstrumento";

class Rubrica extends Component {
  state = {
    id: 1,
    nombre: "Rúbrica para exposición",
    descripcion: "Esta es una descripción de la rúbrica",
    id_personal: 1,
    columnas: [
      { id: 1, titulo: "Excelente", num_columna: 1, id_instrumento: 1 },
      { id: 2, titulo: "Bueno", num_columna: 2, id_instrumento: 1 },
      { id: 3, titulo: "Regular", num_columna: 3, id_instrumento: 1 },
      { id: 4, titulo: "Suficiente", num_columna: 4, id_instrumento: 1 },
      { id: 5, titulo: "Insuficiente", num_columna: 5, id_instrumento: 1 }
    ],
    renglones: [{ id: 1, criterio: "Excelente", num_renglon: 1, id_instrumento: 1 }],
    celdas: [
      {
        id: 11,
        texto: "Cumplió con los requisitos",
        id_renglon: 1,
        id_columna: 1,
        puntos_max: 50
      },
      {
        id: 21,
        texto: "Cumplió con los requisitos",
        id_renglon: 2,
        id_columna: 1,
        puntos_max: 50
      },
      {
        id: 31,
        texto: "Cumplió con los requisitos 2",
        id_renglon: 2,
        id_columna: 1,
        puntos_max: 50
      },
      {
        id: 12,
        texto: "Cumplió con los requisitos",
        id_renglon: 1,
        id_columna: 2,
        puntos_max: 50
      },
      {
        id: 13,
        texto: "Cumplió con los requisitos",
        id_renglon: 1,
        id_columna: 3,
        puntos_max: 50
      },
      {
        id: 14,
        texto: "Cumplió con los requisitos",
        id_renglon: 1,
        id_columna: 4,
        puntos_max: 50
      },
      {
        id: 15,
        texto: "Cumplió con los requisitos",
        id_renglon: 1,
        id_columna: 5,
        puntos_max: 50
      }
    ]
  };

  celdaModificadaHandler = (event, id) => {
    const celdaModificadaIndex = this.state.celdas.findIndex((celda) => celda.id === id);
    let celdasActualizadas = [...this.state.celdas];

    celdasActualizadas[celdaModificadaIndex] = {
      ...celdasActualizadas[celdaModificadaIndex],
      texto: event.target.value
    };

    this.setState({ celdas: celdasActualizadas });
  };

  render() {
    const columnas = this.state.columnas.map((columna) => (
      <Grid item xs={12} sm key={columna.id}>
        <ColumnaInstrumento
          celdas={this.state.celdas.filter((celda) => celda.id_columna === columna.id)}
          cambio={this.celdaModificadaHandler}
          titulo={columna.titulo}
        />
      </Grid>
    ));
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        {columnas}
      </Grid>
    );
  }
}

export default Rubrica;

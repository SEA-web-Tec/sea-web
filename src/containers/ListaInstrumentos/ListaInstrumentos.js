import React, { Component } from "react";
import PropTypes from "prop-types";
import Instrumento from "../../components/IDE/Instrumentos/Instrumento";
import { MenuItem, Divider } from "@material-ui/core";

class ListaInstrumentos extends Component {
  state = {
    instrumentos: [
      {
        nombre: "Rubrica",
        descripcion: "Para exposicion",
        fecha: "06 de septiembre de 2019",
      },
      {
        nombre: "Lista de cotejo",
        descripcion: "Para ensayo",
        fecha: "07 de septiembre de 2019",
      },
      {
        nombre: "Lista de observacion",
        descripcion: "Para resumen",
        fecha: "08 de septiembre de 2019",
      },
    ],
  };

  render() {
    /*const opciones = [
      { nombre: "Crear", onClick: "" },
      { nombre: "Modificar", onClick: "" },
      ,
      { nombre: "Eliminar", onClick: "" },
    ];*/

    const opciones = (
      <div>
        <MenuItem>Crear</MenuItem>
        <MenuItem>Modificar</MenuItem>
        <Divider />
        <MenuItem>Elminar</MenuItem>
      </div>
    );

    const listaInstrumetos = this.state.instrumentos.map(
      (instrumento, index) => (
        <React.Fragment key={index}>
          <Instrumento
            nombre={instrumento.nombre}
            fecha={instrumento.fecha}
            descripcion={instrumento.descripcion}
            opciones={opciones}
          />
          <br />
        </React.Fragment>
      )
    );
    return <div>{listaInstrumetos}</div>;
  }
}

ListaInstrumentos.propTypes = {};

export default ListaInstrumentos;

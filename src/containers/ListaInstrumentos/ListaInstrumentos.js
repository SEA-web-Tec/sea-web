import React, { Component } from "react";
import Instrumento from "../../components/IDE/Instrumentos/Instrumento";
import { MenuItem, Divider } from "@material-ui/core";

class ListaInstrumentos extends Component {
  /* state = {
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
  };*/

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
        <MenuItem>Eliminar</MenuItem>
      </div>
    );

    const listaInstrumetos = this.props.instrumentos.map(
      (instrumento, index) => {
        if ((instrumento.tipo === "Rubrica" && this.props.filtros.rubrica)||(instrumento.tipo === "Lista de Cotejo" && this.props.filtros.cotejo)||(instrumento.tipo === "Lista de Observacion" && this.props.filtros.observacion))
          return (
            <React.Fragment key={index}>
              <Instrumento
                nombre={instrumento.nombre}
                fecha={instrumento.fecha}
                descripcion={instrumento.descripcion}
                opciones={opciones}
              />
              <br />
            </React.Fragment>
          );
          else
            return null;
      }
    );
    return <div>{listaInstrumetos}</div>;
  }
}

export default ListaInstrumentos;

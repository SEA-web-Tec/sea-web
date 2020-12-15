import React, { Component } from "react";
import Portada from "../../../components/Portada/Portada";
import SimpleTabs from "../../../components/Examenes/ExamenesTabs/Tabs";
import FloatingButton from "../../../components/Examenes/ExamFloatingButton/FloatingButton";

class CrearReactivoAbierto extends Component {
  render() {
    const reactivos = [
      //eliminar y editar: agregar id por reactivo
      {
        unidad: 1,
        tema: "Introducción a las tecnologías de dispositivos móviles",
        reactivos: [
          "Reactivo 1A",
          "Reactivo 2A",
          "Reactivo 3A",
          "Reactivo 4A",
          "Reactivo 5A",
          "Reactivo 6A",
          "Reactivo 7A",
          "Reactivo 8A",
          "Reactivo 9A",
          "Reactivo 10A",
          "Reactivo 11A",
          "Reactivo 12A",
          "Reactivo 12A",
          "Reactivo 14A",
          "Reactivo 15A",
          "Reactivo 16A",
          "Reactivo 17A"
        ]
      },
      {
        unidad: 2,
        tema: "Arquitectura y entorno de desarrollo",
        reactivos: ["Reactivo 1B", "Reactivo 2B"]
      },
      {
        unidad: 3,
        tema: "Desarrollo de aplicaciones móviles",
        reactivos: ["Reactivo 1C", "Reactivo 2C", "Reactivo 3C"]
      },
      {
        unidad: 4,
        tema: "Administración de datos y comunicación en dispositivos móviles",
        reactivos: ["Reactivo 1D", "Reactivo 2D", "Reactivo 3D", "Reactivo 4D", "Reactivo 5D"]
      },
      {
        unidad: 5,
        tema: "<< Nueva unidad mágica ultra misteriosa ùwú >>",
        reactivos: ["Reactivo 1E", "Reactivo 2E", "Reactivo 3E", "Reactivo 4E", "Reactivo 5E"]
      }
    ];
    return (
      <>
        <Portada id={this.props.match.params.id} hasTabs>
          <SimpleTabs data={reactivos} />
        </Portada>
        <FloatingButton reactivos={true} />
      </>
    );
  }
}

export default CrearReactivoAbierto;

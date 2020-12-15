import React, { Component } from "react";
import { http } from "shared/http";
import Portada from "../../../components/Portada/Portada";
import SimpleTabs from "../../../components/Examenes/ExamenesTabs/Tabs";
import FloatingButton from "../../../components/Examenes/ExamFloatingButton/FloatingButton";

class CrearReactivoAbierto extends Component {
  state = {
    reactivos: []
  };
  componentDidMount() {
    let url = "/reactivos/todo/" + this.props.match.params.materia_id;
    const idData = {};
    http
      .get(url, idData)
      .then((response) => {
        let arreglo = [];
        for (let i = 0; i < response.data.unidades; i++) {
          arreglo.push([]);
        }
        response.data.reactivos.map((reac) => {
          if (reac.unidad <= response.data.unidades) {
            arreglo[reac.unidad - 1].push(reac);
          }
        });
        console.log(response.data);
        this.setState(
          {
            reactivos: arreglo
          },
          () => {
            console.log(this.state.reactivos);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //eliminar y editar: agregar id por reactivo
    return (
      <Portada id={this.props.match.params.id} hasTabs>
        <SimpleTabs reactivos={this.state.reactivos} />
        <FloatingButton reactivos={true} id={this.props.match.params.id} materia_id={this.props.match.params.materia_id} />
      </Portada>
    );
  }
}

export default CrearReactivoAbierto;

import React, { Component } from "react";
import Portada from "../../components/Portada/Portada";
import SimpleTabs from "../../components/Navigation/Tabs/TabsEdit";

export default class ID extends Component {
  render(props) {
    return (
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
        isID
        status="Aprobado"
      >
        <SimpleTabs />
      </Portada>
    );
  }
}

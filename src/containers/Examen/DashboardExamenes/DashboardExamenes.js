import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import Portada from "../../../components/Portada/Portada";
import SimpleTabs from "../../../components/Navigation/Tabs/Tabs";

class DashboardExamenes extends Component {
  render() {
    return (
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
        hasTabs
      ></Portada>
    );
  }
}

export default withStyles(useStyles)(DashboardExamenes);

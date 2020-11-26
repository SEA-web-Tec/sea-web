import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/TabsEdit";
import CardEvaluacion from "../../components/CardEvaluacionID/CardEvaluacion";

export default class ID extends Component {
  render(props) {
    return (
      <Fragment>
        <CardEvaluacion />
        <Portada
          materia="Programación de Dispositivos Móviles"
          carrera="Ing. Sistemas Computacionales"
          maestro="José Tadeo Rodriguez Solano"
          grupo="F"
          periodo="Enero - Junio 2020"
          hasTabs
          isID
          status="Aprobado"
        >
          <TabsID evaluar={true} />
        </Portada>
      </Fragment>
    );
  }
}

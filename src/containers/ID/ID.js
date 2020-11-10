import React, { Component } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/Tabs";
import CardEvaluacion from "../../components/CardEvaluacionID/CardEvaluacion";

export default class ID extends Component {
  render(props) {
    var instDicID = "";
    return (
      <div>
        <CardEvaluacion />
        <Portada
          materia="Programación de Dispositivos Móviles"
          carrera="Ing. Sistemas Computacionales"
          maestro="José Tadeo Rodriguez Solano"
          grupo="F"
          periodo="Enero - Junio 2020"
          isID
          status="Aprobado"
          hasTabs
        >
          <TabsID evaluar={true} />
        </Portada>
      </div>
    );
  }
}

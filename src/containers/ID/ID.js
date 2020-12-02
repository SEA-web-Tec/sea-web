import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/Tabs";
import CardEvaluacion from "../../components/CardEvaluacionID/CardEvaluacion";

class ID extends Component {
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (correo, contrasenia) =>
      dispatch(actions.auth(correo, contrasenia)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ID);

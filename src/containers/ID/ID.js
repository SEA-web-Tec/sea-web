import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/Tabs";

import CardEvaluacion from "../../components/CardEvaluacionID/CardEvaluacion";
import { connect } from "react-redux";
import * as actions from "store/actions/index";

import { CircularProgress } from "@material-ui/core";

class ID extends Component {
  buscarIntrumentacion = async () => {
    await this.props.onBusqueda(this.props.id_user, this.props.match.params.id);
  };

  render(props) {
    let card = <CardEvaluacion />;
    let info = (
      <div>
        <Portada
          materia="Programación de Dispositivos Móviles"
          carrera="Ing. Sistemas Computacionales"
          maestro="José Tadeo Rodriguez Solano"
          grupo="F"
          periodo="Enero - Junio 2020"
          hasTabs
          isID
          status={this.props.estado}
        >
          <TabsID evaluar={true} id_grupo={this.props.match.params.id} />
        </Portada>
      </div>
    );

    console.log(this.props.estado);

    if (this.props.id_ins == null) {
      this.buscarIntrumentacion();
    }

    if (this.props.loading) {
      info = <CircularProgress /*className={classes.spinner}*/ />;
    }

    return <Fragment>{info}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    id_ins: state.id.id_ins,
    id_user: state.auth.user.id,
    estado: state.id.estado,
    comentario: state.id.comentario,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBusqueda: (user_id, grupo_id) =>
      dispatch(actions.idBusqueda(user_id, grupo_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ID);

import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsIDEditar from "../../components/Navigation/Tabs/TabsEdit";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { CircularProgress } from "@material-ui/core";

class ID extends Component {
  state = {
    entrar: null,
  };
  buscarIntrumentacion = async () => {
    await this.props.onBusqueda(this.props.id_user, this.props.match.params.id);
  };

  render(props) {
    //        <CardEvaluacion />
    let info = (
      <TabsIDEditar evaluar={true} grupo={this.props.match.params.id} />
    );

    console.log(this.props.id_user);

    if (this.state.entrar == null) {
      this.setState({ entrar: "simon" });
      this.buscarIntrumentacion();
    }

    if (this.props.loading) {
      info = <CircularProgress /*className={classes.spinner}*/ />;
    }

    console.log(this.props.estado);

    return (
      <Fragment>
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
          {info}
        </Portada>
      </Fragment>
    );
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

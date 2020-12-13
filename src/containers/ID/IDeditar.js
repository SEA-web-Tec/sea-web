import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsIDEditar from "../../components/Navigation/Tabs/TabsEdit";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { CircularProgress } from "@material-ui/core";

class ID extends Component {
  state = {
    entrar: null,
    materia: "",
    carrera: "",
    maestro: "",
    grupo: "",
    periodo: "",
    foto: "",
  };
  buscarIntrumentacion = async () => {
    await this.props.onBusqueda(this.props.id_user, this.props.match.params.id);
    await this.props.onFetchGrupos(this.props.token, this.props.id_user);
    console.log(this.props.grupo);
    for (let i = 0; i < this.props.grupo.length; i++) {
      if (this.props.grupo[i].id == this.props.match.params.id) {
        this.setState({
          materia: this.props.grupo[i].nombre,
          carrera: this.props.grupo[i].carrera,
          grupo: this.props.grupo[i].grupo,
          foto: this.props.grupo[i].fotoPortada,
          maestro:
            this.props.usuario.nombres +
            " " +
            this.props.usuario.apellidoPaterno +
            " " +
            this.props.usuario.apellidoMaterno,
          periodo: this.props.grupo[i].periodo + " " + this.props.grupo[i].anio,
        });
        break;
      }
    }
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
          materia={this.state.materia}
          carrera={this.state.carrera}
          maestro={this.state.maestro}
          grupo={this.state.grupo}
          periodo={this.state.periodo}
          fotoPortada={this.state.foto}
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
    token: state.auth.token,
    id_user: state.auth.user.id,
    usuario: state.auth.user,
    grupo: state.grupos.grupos,
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
    onFetchGrupos: (token, userId) =>
      dispatch(actions.fetchGrupos(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ID);

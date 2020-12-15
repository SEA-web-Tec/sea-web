import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/Tabs";
import { connect } from "react-redux";
import * as actions from "store/actions/index";

import { CircularProgress } from "@material-ui/core";

class ID extends Component {
  state = {
    entrar: null,
  };

  buscarIntrumentacion = async () => {
    await this.props.onBusqueda(this.props.id_user, this.props.match.params.id);
    await this.props.onFetchGrupos(this.props.token, this.props.id_user);
    for (let i = 0; i < this.props.grupo.length; i++) {
      if (this.props.grupo[i].id == this.props.match.params.id) {
        this.setState({
          materia: this.props.grupo[i].nombre,
          carrera: this.props.grupo[i].carrera,
          grupo: this.props.grupo[i].grupo,
          foto: this.props.grupo[i].fotoPortada,
          maestro:
            this.props.usuario.nombres + " " + this.props.usuario.apellidoPaterno + " " + this.props.usuario.apellidoMaterno,
          periodo: this.props.grupo[i].periodo + " " + this.props.grupo[i].anio
        });
        break;
      }
    }
  };

  render(props) {
    let info = null;
    if (this.state.entrar == null) {
      this.setState({ entrar: "simon" });
      this.buscarIntrumentacion();
    }

    if (this.props.loading) {
      info = <CircularProgress /*className={classes.spinner}*/ />;
    } else if (this.state.materia != "" && this.props.id_ins != null) {
      info = (
        <div>
          <Portada id={this.props.match.params.id} hasTabs isID status={this.props.estado}>
            <TabsID evaluar={true} id_grupo={this.props.match.params.id} />
          </Portada>
        </div>
      );
    }

    return <Fragment>{info}</Fragment>;
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
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBusqueda: (user_id, grupo_id) => dispatch(actions.idBusqueda(user_id, grupo_id)),
    onFetchGrupos: (token, userId) => dispatch(actions.fetchGrupos(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ID);

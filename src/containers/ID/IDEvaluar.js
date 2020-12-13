import React, { Component, Fragment } from "react";
import Portada from "../../components/Portada/Portada";
import TabsID from "../../components/Navigation/Tabs/TabsEvaluar";

import CardEvaluacion from "../../components/CardEvaluacionID/CardEvaluacion";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { CircularProgress } from "@material-ui/core";

class ID extends Component {
  state = {
    entrar:null,
    intrumentaciones: [],
    seleccionado: 0,
    comentario: "",
    nombreMaestroSeleccionado: "",
    grupoSeleccionado: "",
    materiaSeleccionado: "",
    mostrarIcono: false,
    correcto: true,
  };

  //Buscar todas las intrumentaciones
  buscarIntrumentaciones = async () => {
    await this.props.onIntrumentacion();
  };

  //Seleccionar la primera
  //cambiar intrumentacion
  //evaluar intrumentacipon seleccionada

  cambiarSeleccionado = async (dato, index) => {
    this.setState({ seleccionado: dato, comentario: "", mostrarIcono: true });
    console.log(index);
    const nombreM = `Nombre: ${
      this.state.intrumentaciones[index].nombres +
      " " +
      this.state.intrumentaciones[index].apellidoPaterno +
      " " +
      this.state.intrumentaciones[index].apellidoMaterno
    }`;
    this.setState({
      nombreMaestroSeleccionado: nombreM,
      grupoSeleccionado: this.state.intrumentaciones[index].grupo,
      materiaSeleccionado: this.state.intrumentaciones[index]
        .materiaNombre,
    });

    await this.props.onBusquedaInd(dato);
    console.log(dato);
  };

  cambiarComentario = (comentario) => {
    this.setState({ comentario: comentario });
  };

  enviarInstrumentacion = async () => {
    let comentario = this.state.comentario;
    if (this.state.comentario.replace(" ", "") == "") {
      comentario = null;
    }
    await this.props.onEvaluar(this.state.seleccionado, comentario);
  };

  render(props) {
    let info = null;

    if (this.state.entrar == null) {
      this.setState({entrar:"lel"})
      this.buscarIntrumentaciones();
    } else {
      if (
        this.state.intrumentaciones.length === 0 &&
        this.props.intrumentaciones.length !== 0
      ) {
        this.setState({ intrumentaciones: this.props.intrumentaciones }, () => {
          if (this.props.intrumentaciones.length != 0) {
            this.setState({
              seleccionado: this.props.intrumentaciones[0].id,
              comentario: "",
            });
          }
        });
      } else {
        let card = null;
        let ninguna = null;
        if (this.state.intrumentaciones.length !== 0) {
          card = (
            <div>
              <CardEvaluacion
                seleccionar={this.cambiarSeleccionado}
                intrumentaciones={this.state.intrumentaciones}
              />
              <Portada
                materia={this.state.materiaSeleccionado}
                carrera="Evaluando"
                maestro={this.state.nombreMaestroSeleccionado}
                grupo={this.state.grupoSeleccionado}
                periodo="Enero - Junio 2020"
                hasTabs
                isID
                status={this.props.estado}
              >
                <TabsID
                  evaluar={true}
                  cambiar_comentario={this.cambiarComentario}
                  enviar_evaluacion={this.enviarInstrumentacion}
                  mostrar={this.state.mostrarIcono}
                />
              </Portada>
            </div>
          );
        } else if (this.state.correcto) {
          ninguna = (
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={this.state.correcto}
              onClose={() => {
                this.setState({ correcto: false });
                const url = "/grupos/";
                window.location.replace(url);
                //this.props.onAuthDismissError();
              }}
              autoHideDuration={2500}
            >
              <Alert variant="filled" severity="info">
                {"No hay instrumentaciones para evaluar."}
              </Alert>
            </Snackbar>
          );
        }
        info = (
          <div>
            {card}
            {ninguna}
          </div>
        );
      }
    }

    if (this.props.loading) {
      info = <CircularProgress /*className={classes.spinner}*/ />;
    }

    return <Fragment>{info}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    intrumentaciones: state.id.intrumentaciones,
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
    onBusquedaInd: (id_ins) => dispatch(actions.idBusquedaIndividual(id_ins)),
    onEvaluar: (id_ins, comentario) =>
      dispatch(actions.idEvaluar(id_ins, comentario)),
    onIntrumentacion: () => {
      dispatch(actions.idBusquedaAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ID);

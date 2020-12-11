import React, { Component } from "react";
import { useStyles } from "./Tabs.styles";
import TabPanel from "./TabPanel/TabPanel";
import { connect } from "react-redux";
import ValueToLetter from "shared/ValueToLetter";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {
  AppBar,
  Tabs,
  Tab,
  IconButton,
  TextField,
  /*IconButton,*/
} from "@material-ui/core";

import { Feedback as FeedbackIcon } from "@material-ui/icons";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class SimpleTabs extends Component {
  state = {
    value: 0,
    Inicio: [],
    value: 0,
    entrar: false,
    num: 0,
    id_actual: 0,
    abrirComentario: false,
    comentario: "",
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  stringToArray = (texto, actividad) => {
    const arregloTexto = texto.split(";;;");
    const arreglo = [];
    let num = 1;
    arregloTexto.map((elemento) => {
      const fila = {
        label: num,
        actividad: actividad,
        texto: elemento,
      };
      arreglo.push(fila);
      num++;
    });
    return JSON.parse(JSON.stringify(arreglo));
  };

  abrirModal = (modo) => {
    //true abrir
    this.setState({ abrirComentario: modo });
  };

  render() {
    const { classes } = this.props;
    let tabs = null;
    let infoTabs = null;

    if (this.props.id_ins != null) {
      if (this.props.id_ins != this.state.id_actual) {
        this.setState({
          value: 0,
          Inicio: [],
          value: 0,
          entrar: false,
          num: 0,
          id_actual: this.props.id_ins,
          comentario: "",
        });
        tabs = null;
        infoTabs = null;
      }
    }

    if (
      this.state.num === 0 &&
      this.props.id_ins != null &&
      !this.state.entrar
    ) {
      this.setState({ num: 1 });

      let i = 0;
      const arreglo = [];
      while (i < this.props.no_unidades) {
        arreglo.push({
          id_ins: this.props.id_ins,
          unidad: i + 1,
          matriz: [], //evidencia y ponderacion
          //por unidad
          unidades: {
            id_ins: this.props.id_ins,
            unidad: i + 1,
            actividades_aprendizaje:
              this.props.unidades.length != 0
                ? this.stringToArray(
                    this.props.unidades[i].actividades_aprendizaje,
                    "actividades_aprendizaje"
                  )
                : [],
            actividades_enseñanza:
              this.props.unidades.length != 0
                ? this.stringToArray(
                    this.props.unidades[i].actividades_enseñanza,
                    "actividades_enseñanza"
                  )
                : [],
            desarrollo_competencias_genericas:
              this.props.unidades.length != 0
                ? this.stringToArray(
                    this.props.unidades[i].desarrollo_competencias_genericas,
                    "desarrollo_competencias_genericas"
                  )
                : [],
            material_apoyo:
              this.props.unidades.length != 0
                ? this.stringToArray(
                    this.props.unidades[i].material_apoyo,
                    "material_apoyo"
                  )
                : [],
            semana_clases:
              this.props.unidades.length != 0
                ? this.props.unidades[i].semana_clases
                : 1,
            semana_evaluacion:
              this.props.unidades.length != 0
                ? this.props.unidades[i].semana_evaluacion
                : 1,
          },
          indicadoresalcance:
            this.props.indicadoresalcance.length != 0
              ? this.props.indicadoresalcance[i]
              : [], //bien
        });
        i++;
      }
      if (this.props.evidencias != null) {
        for (let i = 0; i < this.props.evidencias.length; i++) {
          let indicadorIngresar = {};
          Object.keys(this.props.indicadoresponderacion[i]).map((indicador) => {
            if (
              indicador != "id_evi" &&
              indicador != "unidad" &&
              indicador != "created_at" &&
              indicador != "updated_at" &&
              indicador != "id_ins" &&
              this.props.indicadoresponderacion[i][indicador] != null
            ) {
              indicadorIngresar[indicador] = this.props.indicadoresponderacion[
                i
              ][indicador];
            }
          });
          arreglo[this.props.evidencias[i].unidad - 1].matriz.push({
            id: arreglo[this.props.evidencias[i].unidad - 1].matriz.length,
            evidencia: this.props.evidencias[i],
            indicadoresponderacion: { ...indicadorIngresar },
          });
        }
      }
      //evidencia e indicadores de alcance son distintos
      let arrgInd = JSON.parse(JSON.stringify(arreglo));
      if (arreglo[0].indicadoresalcance.length != 0) {
        for (let i = 0; i < arreglo.length; i++) {
          arrgInd[i].indicadoresalcance = [];
          //arreglo[i]["indicadoresalcance"].forEach((element) => {
          Object.keys(arreglo[i]["indicadoresalcance"]).map((valor) => {
            let newFila = {};
            if (
              valor != "id_ins" &&
              valor != "unidad" &&
              valor != "created_at" &&
              valor != "updated_at" &&
              valor != "id" &&
              arreglo[i]["indicadoresalcance"][valor] != " "
            ) {
              newFila["label"] = ValueToLetter(valor);
              newFila["actividad"] = "Indicadores de Alcance";
              newFila["texto"] = arreglo[i]["indicadoresalcance"][valor];
              arrgInd[i].indicadoresalcance.push(newFila);
            } else if (
              arreglo[i]["indicadoresalcance"][valor]
                .toString()
                .replace(" ", "") == ""
            ) {
              return;
            }
          });
          //});
        }
      }
      //console.log(arrgInd);
      this.setState({ Inicio: JSON.parse(JSON.stringify(arrgInd)) }, () => {
        this.setState({ entrar: true });
        console.log(arrgInd);
      });
    }

    if (this.state.entrar === true) {
      tabs = this.state.Inicio.map((ins) => {
        return (
          <Tab
            key={ins.unidad}
            label={"Unidad " + ins.unidad}
            {...a11yProps(ins.unidad - 1)}
          />
        );
      });
      infoTabs = this.state.Inicio.map((ins) => {
        return (
          <TabPanel
            key={ins.unidad}
            value={this.state.value}
            index={ins.unidad - 1}
            id_ins={this.props.id_ins}
            ins_unidad={this.state.Inicio[ins.unidad - 1]}
            cambiar={this.cambiarArregloPrincipal}
          >
            {this.props.children}
          </TabPanel>
        );
      });
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            {tabs}
          </Tabs>
        </AppBar>
        <IconButton
          className={classes.expanderFeedback}
          size="large"
          onClick={() => {
            this.abrirModal(true);
          }}
          disabled={!this.props.mostrar}
          visibility={!this.props.mostrar ? "visible" : "hidden"}
        >
          <FeedbackIcon fontSize="large" />
        </IconButton>
        <Modal
          open={this.state.abrirComentario}
          className={classes.modal}
          onClose={() => {
            this.abrirModal(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {
            <div className={classes.paper2}>
              <h2 id="simple-modal-title">Comentario</h2>
              <TextField
                id="simple-modal-description"
                type="text"
                multiline={true}
                fullWidth={true}
                placeholder={
                  "Intruducir comentario (Rechaza la intrumentación). \r\n\r\nNo introducir un comentario (Aprueba la instrumentación)."
                }
                defaultValue={this.state.comentario}
                onChange={(e) => {
                  this.setState({ comentario: e.target.value });
                  this.props.cambiar_comentario(e.target.value);
                }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.enviar_evaluacion();
                }}
              >
                Enviar
              </Button>
            </div>
          }
        </Modal>
        {infoTabs}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_ins: state.id.id_ins,
    no_unidades: state.id.no_unidades,
    indicadoresalcance: state.id.indicadoresalcance,
    unidades: state.id.unidades,
    evidencias: state.id.evidencias,
    indicadoresponderacion: state.id.ponderacion,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SimpleTabs));

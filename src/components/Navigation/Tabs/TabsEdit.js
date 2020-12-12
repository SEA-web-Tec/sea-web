import React, { Component } from "react";
import { useStyles } from "./Tabs.styles";
import { withStyles } from "@material-ui/core/styles";
import TabPanelEdit from "./TabPanel/TabPanelEdit";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Button, CircularProgress } from "@material-ui/core";

import {
  AppBar,
  Tabs,
  Tab,
  /*IconButton,*/
} from "@material-ui/core";
import ValueToLetter from "shared/ValueToLetter";
import letterValue from "shared/LetterValue";
import { addSyntheticTrailingComment } from "typescript";
/*
                  <IconButton className={classes.expanderFeedback}>
                    <FeedbackIcon />
                  </IconButton>
*/

//import ListItemEdit from "../../UI/ListItem/ListItemEdit";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class SimpleTabs extends Component {
  state = {
    intrumentacion: [],
    Inicio: [],
    value: 0,
    entrar: false,
    num: 0,
    error: { enviar: true, nombre: "", num: "", unidad: 0 },
    correcto: false,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  verificarIndicadoresAlcance = () => {
    const arrg = JSON.parse(JSON.stringify(this.state.intrumentacion));
    var error = { enviar: true, nombre: "", num: 0, unidad: 0 };
    for (let i = 0; i < arrg.length; i++) {
      if (Object.keys(arrg[i].indicadoresalcance).length > 2 && error.enviar) {
        for (var el in arrg[i].indicadoresalcance) {
          if (arrg[i].indicadoresalcance.hasOwnProperty(el)) {
            if (
              el.toString() != "id" &&
              el.toString() != "id_ins" &&
              el.toString() != "unidad"
            ) {
              if (arrg[i].indicadoresalcance[el].replace(" ", "") == "") {
                error = {
                  enviar: false,
                  nombre: "Indicador de alcance",
                  num: el,
                  unidad: arrg[i].unidad,
                };
                this.setState({ error: error }, () => {
                  console.log("error nulo indicador alcance");
                });
                break;
              }
            }
          }
        }
      } else {
        if (error.enviar) {
          error = {
            enviar: false,
            nombre: "Indicador de alcance",
            num: i,
            unidad: arrg[i].unidad,
          };
          this.setState({ error: error }, () => {
            console.log("error vacio arreglo indicador alcance");
          });
          break;
        } else {
          break;
        }
      }
    }
    if (error.enviar) {
      this.verificarMatriz();
    }
  };

  verificarMatriz = () => {
    const arrg = JSON.parse(JSON.stringify(this.state.intrumentacion));
    var sumaTotal = 0;
    var error = { enviar: true, nombre: "", num: 0, unidad: 0 };
    for (let i = 0; i < arrg.length; i++) {
      if (arrg[i]["matriz"].length != 0 && error.enviar) {
        arrg[i]["matriz"].forEach((element) => {
          var sumaInterna = 0;
          sumaTotal += element.evidencia.ponderacion;
          for (var el in element.indicadoresponderacion) {
            if (element.indicadoresponderacion.hasOwnProperty(el)) {
              if (
                el.toString() != "id_evi" &&
                el.toString() != "id_ins" &&
                el.toString() != "created_at" &&
                el.toString() != "updated_at" &&
                el.toString() != "unidad" &&
                element.indicadoresponderacion[el] != null
              ) {
                sumaInterna += parseInt(element.indicadoresponderacion[el]);
              }
            }
          }
          if (sumaInterna != element.evidencia.ponderacion) {
            error = {
              enviar: false,
              nombre: "Indicador de ponderacion",
              num: i + 1,
              unidad: arrg[i].unidad,
            };
            this.setState({ error: error }, () => {
              console.log("error interno");
              console.log(sumaInterna);
              console.log(this.state.error);
              //break;
            });
          }
        });
      } else {
        console.log("error interno");
        if (error.enviar) {
          console.log("error arreglo");
          error = {
            enviar: false,
            nombre: "Indicador de ponderacion",
            num: i + 1,
            unidad: arrg[i].unidad,
          };
          this.setState({ error: error }, () => {
            console.log(this.state.error);
            //return break;
          });
        }
      }
      if (sumaTotal != 100) {
        if (error.enviar) {
          console.log("error total");
          console.log(sumaTotal);
          error = {
            enviar: false,
            nombre: "Indicador de ponderacion",
            num: 0,
            unidad: 0,
          };
          this.setState({ error: error }, () => {
            console.log(this.state.error);
          });
        }
        break;
      } else if (!error.enviar) {
        break;
      } else sumaTotal = 0;
    }
    if (error.enviar) {
      this.arrayToStringAll();
    }
  };

  arrayToStringAll = async () => {
    const arrg = JSON.parse(JSON.stringify(this.state.intrumentacion));
    console.log(arrg);
    for (let i = 0; i < arrg.length; i++) {
      arrg[i].unidades["actividades_aprendizaje"] = await this.arrayToString(
        arrg[i],
        "actividades_aprendizaje",
        i + 1
      );
      if (this.state.error.enviar == false) break;
      arrg[i].unidades["actividades_enseñanza"] = await this.arrayToString(
        arrg[i],
        "actividades_enseñanza",
        i + 1
      );
      if (this.state.error.enviar == false) break;
      arrg[i].unidades[
        "desarrollo_competencias_genericas"
      ] = await this.arrayToString(
        arrg[i],
        "desarrollo_competencias_genericas",
        i + 1
      );
      if (this.state.error.enviar == false) break;
      arrg[i].unidades["material_apoyo"] = await this.arrayToString(
        arrg[i],
        "material_apoyo",
        i + 1
      );
      if (this.state.error.enviar == false) break;
    }
    if (this.state.error.enviar) {
      const indicadoresalcance = [];
      const unidades = [];
      const evidencias = [];
      const ponderacion = [];

      arrg.map((elemento) => {
        indicadoresalcance.push(elemento.indicadoresalcance);
        unidades.push(elemento.unidades);
        elemento.matriz.map((elementoMatriz) => {
          evidencias.push(elementoMatriz.evidencia);
          ponderacion.push(elementoMatriz.indicadoresponderacion);
        });
      });

      await this.props.onIngresar(
        this.props.id_ins,
        indicadoresalcance,
        unidades,
        evidencias,
        ponderacion
      );
      this.setState({ correcto: true });
    } else {
      console.log("salio error");
      console.log(this.state.error);
      console.log(this.state.intrumentacion);
    }
  };

  //enviar arreglo[i]
  arrayToString = (arreglo, nombre, unidad) => {
    let texto = "";
    let error = { enviar: true, nombre: "", num: 0, unidad: 0 };
    for (let j = 0; j < arreglo.unidades[nombre].length; j++) {
      if (j < arreglo.unidades[nombre].length - 1) {
        texto += arreglo.unidades[nombre][j].texto + ";;;";
      } else {
        texto += arreglo.unidades[nombre][j].texto;
      }
      if (arreglo.unidades[nombre][j].texto.replace(" ", "") == "") {
        console.log("error");
        error = { enviar: false, nombre: nombre, num: j + 1, unidad: unidad };
        this.setState({ error: error }, () => {
          console.log(this.state.error);
          return texto;
        });
      }
    }
    if (!error.enviar) {
      this.setState({ error: error }, () => {
        console.log(this.state.error);
        return texto;
      });
    } else if (arreglo.unidades[nombre].length == 0) {
      error = { enviar: false, nombre: nombre, num: 0, unidad: unidad };
      this.setState({ error: error }, () => {
        console.log(this.state.error);
        return texto;
      });
    } else return texto;
  };

  indicadorDeAlcance = (id) => {
    let arrg = this.state.intrumentacion;
    let newFila = { id_ins: this.props.id_ins, unidad: arrg[id].unidad };
    arrg[id].indicadoresalcance.forEach((element) => {
      newFila[letterValue(element.label)] = element.texto;
    });
    arrg[id].indicadoresalcance = newFila;
    this.setState({ intrumentacion: arrg });
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

  cambiarArregloPrincipal = (arreglo, nombre, id) => {
    const arrg = JSON.parse(JSON.stringify(this.state.intrumentacion));

    if (nombre == "indicadoresalcance") {
      arrg[id][nombre] = arreglo;
      this.setState({ intrumentacion: arrg }, () => {
        this.indicadorDeAlcance(id);
      });
    } else if (nombre == "matriz") {
      arrg[id].matriz = arreglo;
      this.setState({ intrumentacion: arrg });
    } else {
      arrg[id].unidades[nombre] = arreglo;
      this.setState({ intrumentacion: arrg });
    }
  };

  enviar = () => {
    this.setState(
      //primero verificar indicadores de alcance
      //verificar que existan y la suma de las ponderaciones finales == 100 y ponderacion == ponderacion actual
      { error: { enviar: true, nombre: "", num: 0, unidad: 0 } },
      () => {
        // this.arrayToStringAll();
        this.verificarIndicadoresAlcance();
      }
    );
  };

  render() {
    //const classes = "useStyles";
    const { classes } = this.props;
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
      } else {
        arrgInd[i].indicadoresalcance = [];
        const indicadores = {
          A: "Se adapta a situaciones y contextos complejos.",
          B: "Hace aportaciones a las actividades académicas desarrolladas.",
          C:
            "Propone y/o explica soluciones o procedimientos no vistos en clase.",
          D:
            "Introduce recursos y/o experiencias que promuevan un pensamiento crítico.",
          E:
            "Incorpora conocimientos y actividades interdiciplinarias en su aprendizaje.",
          F: "Realiza su trabajo de manera autómata y autorregulada.",
        };
        for (let i = 0; i < arreglo.length; i++) {
          Object.keys(indicadores).map((valor) => {
            let newFila = {};
            newFila["label"] = ValueToLetter(valor);
            newFila["actividad"] = "Indicadores de Alcance";
            newFila["texto"] = indicadores[valor];
            arrgInd[i].indicadoresalcance.push(newFila);
          });
        }
      }
      //console.log(arrgInd);
      this.setState(
        { intrumentacion: JSON.parse(JSON.stringify(arrgInd)) },
        () => {
          this.setState({ entrar: true });
        }
      );
      this.setState({ Inicio: JSON.parse(JSON.stringify(arrgInd)) });
    }

    let tabs = null;
    let infoTabs = null;

    if (this.state.entrar === true) {
      tabs = this.state.intrumentacion.map((ins) => {
        return (
          <Tab
            key={ins.unidad}
            label={"Unidad " + ins.unidad}
            {...a11yProps(ins.unidad - 1)}
          />
        );
      });
      infoTabs = this.state.intrumentacion.map((ins) => {
        return (
          <TabPanelEdit
            key={ins.unidad}
            value={this.state.value}
            index={ins.unidad - 1}
            id_ins={this.props.id_ins}
            ins_unidad={this.state.Inicio[ins.unidad - 1]}
            cambiar={this.cambiarArregloPrincipal}
          >
            {this.props.children}
          </TabPanelEdit>
        );
      });
    }

    let error = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!this.state.error.enviar}
        onClose={() => {
          const error = { enviar: true, nombre: "", num: "", unidad: 0 };
          this.setState({ error: error });
          //this.props.onAuthDismissError();
        }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error">
          {"Error en " +
            this.state.error.nombre +
            " en " +
            this.state.error.num +
            " en la unidad " +
            this.state.error.unidad}
        </Alert>
      </Snackbar>
    );

    let success = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={this.state.correcto}
        onClose={() => {
          this.setState({ correcto: false });
          const url = "/instrumentacion/" + this.props.grupo; //grupo
          window.location.replace(url);
          //this.props.onAuthDismissError();
        }}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="success">
          {"Intrumentacion editada/creada correctamente"}
        </Alert>
      </Snackbar>
    );

    return (
      <React.Fragment>
        {error}
        {success}
        <AppBar
          component="div"
          color="primary"
          position="sticky"
          //indicatorColor="primary"
          className={classes.unidades}
        >
          <Tabs
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {tabs}
          </Tabs>
        </AppBar>
        {infoTabs}
        <Button variant="contained" color="primary" onClick={this.enviar}>
          Enviar
        </Button>
      </React.Fragment>
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
  return {
    onIngresar: (
      id_ins,
      indicadoresalcance,
      unidades,
      evidencias,
      ponderacion
    ) =>
      dispatch(
        actions.idIngresar(
          id_ins,
          indicadoresalcance,
          unidades,
          evidencias,
          ponderacion
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SimpleTabs));

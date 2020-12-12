import React, { Component } from "react";
import TabPanel from "./TabPanel/TabPanel";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import ValueToLetter from "shared/ValueToLetter";
import { useStyles } from "./Tabs.styles";
import { withStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { AppBar, Tabs, Tab, Button, IconButton } from "@material-ui/core";

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

  arrayToStringAll = async () => {
    const arrg = JSON.parse(JSON.stringify(this.state.Inicio));
    console.log(arrg);
    for (let i = 0; i < arrg.length; i++) {
      arrg[i].unidades["actividades_aprendizaje"] = await this.arrayToString(
        arrg[i],
        "actividades_aprendizaje",
        i + 1
      );
      arrg[i].unidades["actividades_enseñanza"] = await this.arrayToString(
        arrg[i],
        "actividades_enseñanza",
        i + 1
      );
      arrg[i].unidades[
        "desarrollo_competencias_genericas"
      ] = await this.arrayToString(
        arrg[i],
        "desarrollo_competencias_genericas",
        i + 1
      );
      arrg[i].unidades["material_apoyo"] = await this.arrayToString(
        arrg[i],
        "material_apoyo",
        i + 1
      );
    }
    return arrg;
  };

  arrayToString = async (arreglo, nombre, unidad) => {
    let texto = "";
    for (let j = 0; j < arreglo.unidades[nombre].length; j++) {
      if (j < arreglo.unidades[nombre].length - 1) {
        texto += arreglo.unidades[nombre][j].texto + "\r\n";
      } else {
        texto += arreglo.unidades[nombre][j].texto;
      }
    }
    return texto;
  };

  crearPDF = async () => {
    const intrumentacionPDF = jsPDF("landscape");
    const finalY = intrumentacionPDF.lastAutoTable.finalY || 10;
    intrumentacionPDF.setFontSize(12);
    intrumentacionPDF.text("lel", 15, finalY + 15, {
      styles: { fontSize: 5 },
    });

    const indicadores = [
      "Se adapta a situaciones y contextos complejos.",
      "Hace aportaciones a las actividades académicas desarrolladas.",
      "Propone y/o explica soluciones o procedimientos no vistos en clase.",
      "Introduce recursos y/o experiencias que promuevan un pensamiento crítico.",
      "Incorpora conocimientos y actividades interdiciplinarias en su aprendizaje.",
      "Realiza su trabajo de manera autómata y autorregulada.",
    ];

    let cuerpoME = [];
    let cuerpoTemasYSubtemas = [];
    let cuerpoIndicadores = [];
    let sumas = [];
    const arregloTexto = await this.arrayToStringAll();
    for (let i = 0; i < this.state.Inicio.length; i++) {
      cuerpoME.push([]);
      sumas.push([]);
      cuerpoTemasYSubtemas.push([]);
      cuerpoIndicadores.push([]);
      cuerpoTemasYSubtemas[i].push([
        "",
        arregloTexto[i].unidades.actividades_aprendizaje,
        arregloTexto[i].unidades.actividades_enseñanza,
        arregloTexto[i].unidades.desarrollo_competencias_genericas,
        "",
      ]);
      for (let j = 0; j < this.state.Inicio[i].matriz.length; j++) {
        cuerpoME[i].push([
          this.state.Inicio[i].matriz[j].evidencia.nombre,
          this.state.Inicio[i].matriz[j].evidencia.ponderacion,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.A != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.A
            : 0,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.B != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.B
            : 0,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.C != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.C
            : 0,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.D != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.D
            : 0,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.E != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.E
            : 0,
          this.state.Inicio[i].matriz[j].indicadoresponderacion.F != undefined
            ? this.state.Inicio[i].matriz[j].indicadoresponderacion.F
            : 0,
          this.state.Inicio[i].matriz[j].evidencia.evaluacion_formativa,
        ]);
        console.log(cuerpoME[i][cuerpoME[i].length - 1][3]);
        sumas[i].A =
          (sumas[i].A != undefined ? sumas[i].A : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][2];
        sumas[i].B =
          (sumas[i].B != undefined ? sumas[i].B : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][3];
        sumas[i].C =
          (sumas[i].C != undefined ? sumas[i].C : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][4];
        sumas[i].D =
          (sumas[i].D != undefined ? sumas[i].D : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][5];
        sumas[i].E =
          (sumas[i].E != undefined ? sumas[i].E : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][6];
        sumas[i].F =
          (sumas[i].F != undefined ? sumas[i].F : 0) +
          cuerpoME[i][cuerpoME[i].length - 1][7];
        console.log(sumas[i]);
      }
      cuerpoIndicadores[i].push([indicadores[0], sumas[i].A]);
      cuerpoIndicadores[i].push([indicadores[1], sumas[i].B]);
      cuerpoIndicadores[i].push([indicadores[2], sumas[i].C]);
      cuerpoIndicadores[i].push([indicadores[3], sumas[i].D]);
      cuerpoIndicadores[i].push([indicadores[4], sumas[i].E]);
      cuerpoIndicadores[i].push([indicadores[5], sumas[i].F]);
    }

    for (let i = 0; i < this.state.Inicio.length; i++) {
      //Temas y esas madres
      if (i != 0) intrumentacionPDF.addPage();
      intrumentacionPDF.text(
        132,
        intrumentacionPDF.lastAutoTable.finalY || 10,
        "Unidad" + (i + 1)
      );
      console.log(cuerpoTemasYSubtemas[i]);
      intrumentacionPDF.autoTable({
        head: [
          [
            "Temas y Subtemas para Desarrollar la Competencia Especifica",
            "Actividades de Aprendizaje",
            "Actividadea de Enseñanza",
            "Desarrollo de Competencias Genericas",
            "Horas-Teorico-Practica",
          ],
        ],
        styles: { fontSize: 10 },
        startY: intrumentacionPDF.lastAutoTable.finalY + 5 || 20,
        body: [...cuerpoTemasYSubtemas[i]],
      });
      //Indicadores de alcance
      //intrumentacionPDF.addPage();
      intrumentacionPDF.autoTable({
        head: [["Indicadores de alcance", "Valores del indicador"]],
        styles: { fontSize: 10 },
        startY: intrumentacionPDF.lastAutoTable.finalY + 10,
        body: [...cuerpoIndicadores[i]],
      });
      //Niveles de desempeño
      intrumentacionPDF.text(
        122,
        intrumentacionPDF.lastAutoTable.finalY + 8,
        "Niveles de Desempeño"
      );
      intrumentacionPDF.autoTable({
        startY: intrumentacionPDF.lastAutoTable.finalY + 15,
        //headStyles:{1:{halign:"center",fillColor:[0,255,0]}},
        head: [
          [
            "DESEMPEÑO",
            "NIVEL DE DESEMPEÑO",
            "INDICADORES DE ALCANCE",
            "VALORACIÓN NUMERICA",
          ],
        ],
        styles: { fontSize: 10 },
        body: [
          ["", "Excelente", "ABCDEF", this.Porcentaje(sumas[i], 5, false)],
          [
            "Competencia",
            "Notable",
            "ABCDE",
            this.Porcentaje(sumas[i], 4, false),
          ],
          ["alcanzada", "Bueno", "ABCDE", this.Porcentaje(sumas[i], 4, true)],
          ["", "Suficiente", "ABCD", this.Porcentaje(sumas[i], 3, false)],
          ["Competencia no alcanzada", "Insuficiente", "ABC", "NA"],
        ],
      });
      //Matriz de evaluacion
      intrumentacionPDF.text(
        122,
        intrumentacionPDF.lastAutoTable.finalY + 8,
        "Matriz de Evaluación"
      );
      intrumentacionPDF.autoTable({
        head: [
          [
            "Matriz de Evaluación",
            "%",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "Evaluacion Formativa de la Competencia",
          ],
        ],
        styles: { fontSize: 10 },
        startY: intrumentacionPDF.lastAutoTable.finalY + 15,
        body: [
          ...cuerpoME[i],
          [
            "Total",
            "100",
            sumas[i].A,
            sumas[i].B,
            sumas[i].C,
            sumas[i].D,
            sumas[i].E,
            sumas[i].F,
            "",
          ],
        ],
      });
    }

    //intrumentacionPDF.autoTable({ html: "#tabla0" });
    intrumentacionPDF.save("Intrumentacion_Didactica.pdf");
  };

  Porcentaje = (arreglo, max, restar) => {
    let total = 0;
    if (restar === true) {
      total = -10;
    }
    if (max >= 0) total += arreglo.A;
    if (max >= 1) total += arreglo.B;
    if (max >= 2) total += arreglo.C;
    if (max >= 3) total += arreglo.D;
    if (max >= 4) total += arreglo.E;
    if (max >= 5) total += arreglo.F;

    if (total < 70) return "NA";
    else return (total - 5).toString() + "-" + total.toString() + "%";
  };

  render() {
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
      this.setState({ Inicio: JSON.parse(JSON.stringify(arrgInd)) }, () => {
        this.setState({ entrar: true });
      });
    }

    let tabs = null;
    let infoTabs = null;

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
        {infoTabs}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.crearPDF();
          }}
        >
          Pdf
        </Button>
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

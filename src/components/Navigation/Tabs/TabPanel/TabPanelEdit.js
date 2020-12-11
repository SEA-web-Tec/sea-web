import React, { Component } from "react";
import PropTypes from "prop-types";
import { useStyles } from "../Tabs.styles";
import { withStyles } from "@material-ui/core/styles";

import {
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  //Feedback as FeedbackIcon,
} from "@material-ui/icons";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItemEdit from "../../../UI/ListItem/ListItemEdit";
import ChipEdit from "../../../UI/ChipEdit/ChipEdit";
import MatrizEvaluacion from "../../../UI/MaterialTable/MaterialTableEdit";

import letterValue from "shared/LetterValue";

class TabPanelEdit extends Component {
  state = {
    actividades_aprendizaje: [],
    actividades_enseñanza: [],
    desarrollo_competencias_genericas: [],
    indicadoresalcance: [],
    material_apoyo: [],
    matriz: [],
    semana_clases: 1,
    semana_evaluacion: 1,
    cerrar: false,
  };
  sumaPorcentaje = (id) => {
    var sumaTotal = 0;
    this.state.matriz.forEach((element) => {
      if (element.id != id) sumaTotal += element.evidencia.ponderacion;
    });
    return sumaTotal;
  };

  sumaPorcentajeFila = (id, letra) => {
    var sumaTotal = 0;
    this.state.matriz.forEach((element) => {
      if (element.id == id) {
        for (var el in element.indicadoresponderacion) {
          if (element.indicadoresponderacion.hasOwnProperty(el)) {
            if (
              el.toString() != letra &&
              el.toString() != "id_evi" &&
              el.toString() != "id_ins" &&
              el.toString() != "unidad"
            ) {
              sumaTotal += parseInt(element.indicadoresponderacion[el]);
            }
          }
        }
        return 0;
      }
    });
    return sumaTotal;
  };

  modSemClases = (e) => {
    this.setState({ semana_clases: e.target.value }, () => {
      this.props.cambiar(e.target.value, "semana_clases", this.props.index);
    });
  };

  modSemEva = (e) => {
    this.setState({ semana_evaluacion: e.target.value }, () => {
      this.props.cambiar(e.target.value, "semana_evaluacion", this.props.index);
    });
  };

  addRow = () => {
    var fila = {
      id: this.state.matriz.length,
      evidencia: {
        nombre: "Examen",
        evaluacion_formativa: "Lista de cotejo",
        ponderacion: 0,
        unidad: this.props.index + 1,
        id_ins: this.props.id_ins,
      },
      indicadoresponderacion: {},
    };
    this.state.indicadoresalcance.forEach((element) => {
      var letra = letterValue(element.label);
      fila.indicadoresponderacion[letra] = 0;
    });
    var arreglo = JSON.parse(JSON.stringify(this.state.matriz));
    arreglo.push(fila);
    this.setState({ matriz: arreglo });
    this.props.cambiar(arreglo, "matriz", this.props.index);
  };

  addLetras = () => {
    var arreglo = [];
    var letra = letterValue(this.state.indicadoresalcance.length + 1);
    this.state.matriz.forEach((element) => {
      var newFila = element;
      newFila.indicadoresponderacion[letra] = 0;
      arreglo.push(newFila);
    });
    this.setState({ matriz: arreglo });
    this.props.cambiar(arreglo, "matriz", this.props.index);
  };

  deleteLetras = () => {
    var arreglo = [];
    this.state.matriz.forEach((element) => {
      var letra = letterValue(this.state.indicadoresalcance.length);
      var newFila = element;
      delete newFila.indicadoresponderacion[letra];
      arreglo.push(newFila);
    });
    this.setState({ matriz: arreglo });
    this.props.cambiar(arreglo, "matriz", this.props.index);
  };

  deleteRow = (id) => {
    var arreglo = JSON.parse(JSON.stringify(this.state.matriz));
    arreglo.splice(id, 1);
    var arreglo2 = [];
    arreglo.forEach((element) => {
      if (element.id > id) {
        var cambio = element;
        cambio.id = element.id - 1;
        arreglo2.push(cambio);
      } else arreglo2.push(element);
    });
    this.setState({ matriz: arreglo2 });
    this.props.cambiar(arreglo2, "matriz", this.props.index);
  };

  changeRowData = (id, campo, dato) => {
    var arreglo = JSON.parse(JSON.stringify(this.state.matriz));
    arreglo[id].evidencia[campo] = dato;
    this.setState({ matriz: arreglo });
    this.props.cambiar(arreglo, "matriz", this.props.index);
  };

  changePonderacionData = (id, campo, dato) => {
    var arreglo = JSON.parse(JSON.stringify(this.state.matriz));
    arreglo[id].indicadoresponderacion[campo] = dato;
    this.setState({ matriz: arreglo });
    this.props.cambiar(arreglo, "matriz", this.props.index);
  };

  addElement = (actividad2, arrg, caso) => {
    var arreglo = JSON.parse(JSON.stringify(arrg));
    arreglo.push({
      label: arrg.length + 1,
      actividad: actividad2,
      texto: "",
    });
    this.ingresar(caso, arreglo);
  };

  changeElement = (label, text, arrg, caso) => {
    var arreglo = JSON.parse(JSON.stringify(arrg));
    arreglo[label - 1].texto = text;
    this.ingresar(caso, arreglo);
  };

  deleteElement = (label, arrg, caso) => {
    var arreglo = JSON.parse(JSON.stringify(arrg));
    arreglo.splice(label - 1, 1);
    var arreglo2 = [];
    arreglo.forEach((element) => {
      if (element.label > label) {
        var cambio = element;
        cambio.label = element.label - 1;
        arreglo2.push(cambio);
      } else arreglo2.push(element);
    });
    this.ingresar(caso, arreglo2);
  };

  ingresar = (caso, arreglo) => {
    switch (caso) {
      case 0:
        this.setState({ actividades_aprendizaje: arreglo }, () => {
          this.props.cambiar(
            arreglo,
            "actividades_aprendizaje",
            this.props.index
          );
        });
        break;
      case 1:
        this.setState({ actividades_enseñanza: arreglo }, () => {
          this.props.cambiar(
            arreglo,
            "actividades_enseñanza",
            this.props.index
          );
        });
        break;
      case 2:
        this.setState({ desarrollo_competencias_genericas: arreglo }, () => {
          this.props.cambiar(
            arreglo,
            "desarrollo_competencias_genericas",
            this.props.index
          );
        });
        break;
      case 3:
        this.setState({ indicadoresalcance: arreglo }, () => {
          this.props.cambiar(arreglo, "indicadoresalcance", this.props.index);
        });
        break;
      case 4:
        this.setState({ material_apoyo: arreglo }, () => {
          this.props.cambiar(arreglo, "material_apoyo", this.props.index);
        });
        break;
      default:
        break;
    }
  };

  changeElementInicio = (arrg, arrgMod) => {
    var arreglo = JSON.parse(JSON.stringify(arrg));
    for (let i = 0; i < arrgMod.length; i++) {
      arreglo.push(arrgMod[i]);
    }
    return arreglo;
  };

  render() {
    //const { children, value, index, ...other } = this.props;
    //actividades_aprendizaje
    const { classes } = this.props;

    if (
      this.props.ins_unidad.unidades.actividades_aprendizaje.length != 0 &&
      this.state.actividades_aprendizaje.length === 0
    ) {
      const arreglo = this.changeElementInicio(
        this.state.actividades_aprendizaje,
        this.props.ins_unidad.unidades.actividades_aprendizaje
      );
      this.setState({ actividades_aprendizaje: arreglo }, () => {
        this.props.cambiar(
          arreglo,
          "actividades_aprendizaje",
          this.props.index
        );
      });
    } else if (this.state.actividades_aprendizaje.length === 0) {
      this.addElement(
        "Actividad de Aprendizaje",
        this.state.actividades_aprendizaje,
        0
      );
    }
    //actividades_enseñanza
    if (
      this.props.ins_unidad.unidades.actividades_enseñanza.length != 0 &&
      this.state.actividades_enseñanza.length === 0
    ) {
      const arreglo = this.changeElementInicio(
        this.state.actividades_enseñanza,
        this.props.ins_unidad.unidades.actividades_enseñanza
      );
      this.setState({ actividades_enseñanza: arreglo }, () => {
        this.props.cambiar(arreglo, "actividades_enseñanza", this.props.index);
      });
    } else if (this.state.actividades_enseñanza.length === 0) {
      this.addElement(
        "Actividad de Enseñanza",
        this.state.actividades_enseñanza,
        1
      );
    }
    //desarrollo_competencias_genericas
    if (
      this.props.ins_unidad.unidades.desarrollo_competencias_genericas.length !=
        0 &&
      this.state.desarrollo_competencias_genericas.length === 0
    ) {
      const arreglo = this.changeElementInicio(
        this.state.desarrollo_competencias_genericas,
        this.props.ins_unidad.unidades.desarrollo_competencias_genericas
      );
      this.setState({ desarrollo_competencias_genericas: arreglo }, () => {
        this.props.cambiar(
          arreglo,
          "desarrollo_competencias_genericas",
          this.props.index
        );
      });
    } else if (this.state.desarrollo_competencias_genericas.length === 0) {
      this.addElement(
        "Desarrollo de Competencias Genericas",
        this.state.desarrollo_competencias_genericas,
        2
      );
    }
    //indicadoresalcance es distinto
    if (
      this.props.ins_unidad.indicadoresalcance.length != 0 &&
      this.state.indicadoresalcance.length === 0
    ) {
      const arreglo = this.changeElementInicio(
        this.state.indicadoresalcance,
        this.props.ins_unidad.indicadoresalcance
      );
      this.setState({ indicadoresalcance: arreglo }, () => {
        this.props.cambiar(arreglo, "indicadoresalcance", this.props.index);
      });
    } else if (this.state.indicadoresalcance.length === 0) {
      this.addElement(
        "Indicadores de Alcance",
        this.state.indicadoresalcance,
        3
      );
    }
    //Material de apoyo
    if (
      this.props.ins_unidad.unidades.material_apoyo.length != 0 &&
      this.state.material_apoyo.length === 0
    ) {
      const arreglo = this.changeElementInicio(
        this.state.material_apoyo,
        this.props.ins_unidad.unidades.material_apoyo
      );
      this.setState({ material_apoyo: arreglo }, () => {
        this.props.cambiar(arreglo, "material_apoyo", this.props.index);
      });
    } else if (this.state.material_apoyo.length === 0) {
      this.addElement("Material de Apoyo", this.state.material_apoyo, 4);
    }
    ///Matriz
    if (
      this.props.ins_unidad.matriz.length !== 0 &&
      !this.state.cerrar &&
      this.state.matriz.length === 0
    ) {
      this.setState({ cerrar: true }, () => {
        const arreglo = this.changeElementInicio(
          this.state.matriz,
          this.props.ins_unidad.matriz
        );
        this.setState({
          semana_clases: this.props.ins_unidad.unidades.semana_clases,
          semana_evaluacion: this.props.ins_unidad.unidades.semana_evaluacion,
        });
        this.setState({ matriz: arreglo }, () => {
          this.props.cambiar(arreglo, "matriz", this.props.index);
        });
      });
    }

    return (
      <div
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`simple-tabpanel-${this.props.index}`}
      >
        {this.props.value === this.props.index && (
          <Box p={2}>
            <Grid container>
              <Grid item xs={12} sm={5} md={6} lg={6}>
                <Typography
                  className={classes.titulo}
                  variant="h6"
                  component="h6"
                >
                  Introducción a las Bases de Datos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} md={6} lg={6}>
                <Box className={classes.semanas}>
                  <ChipEdit
                    label="Semanas de clase"
                    modificar={this.modSemClases}
                    valor={this.state.semana_clases}
                    numeros={[
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                    ]}
                  />
                  <ChipEdit
                    label="Semanas de evaluación"
                    modificar={this.modSemEva}
                    valor={this.state.semana_evaluacion}
                    numeros={[
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.contentGrid}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Actividades de Aprendizaje
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {this.state.actividades_aprendizaje.map((Act) => {
                      return (
                        <ListItemEdit
                          key={Act.label}
                          label={Act.label}
                          Actividad={Act.actividad}
                          ultimo={this.state.actividades_aprendizaje.length}
                          crear={() => {
                            this.addElement(
                              Act.actividad,
                              this.state.actividades_aprendizaje,
                              0
                            );
                          }}
                          eliminar={() => {
                            this.deleteElement(
                              Act.label,
                              this.state.actividades_aprendizaje,
                              0
                            );
                          }}
                        >
                          <TextField
                            type="text"
                            multiline={true}
                            fullWidth={true}
                            placeholder={Act.actividad}
                            defaultValue={Act.texto}
                            onBlur={(e) => {
                              this.changeElement(
                                Act.label,
                                e.target.value,
                                this.state.actividades_aprendizaje,
                                0
                              );
                            }}
                          />
                        </ListItemEdit>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Actividades de Enseñanza
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {this.state.actividades_enseñanza.map((Act) => {
                      return (
                        <ListItemEdit
                          key={Act.label}
                          label={Act.label}
                          Actividad={Act.actividad}
                          ultimo={this.state.actividades_enseñanza.length}
                          crear={() => {
                            this.addElement(
                              Act.actividad,
                              this.state.actividades_enseñanza,
                              1
                            );
                          }}
                          eliminar={() => {
                            this.deleteElement(
                              Act.label,
                              this.state.actividades_enseñanza,
                              1
                            );
                          }}
                        >
                          <TextField
                            type="text"
                            multiline={true}
                            fullWidth={true}
                            placeholder={Act.actividad}
                            defaultValue={Act.texto}
                            onBlur={(e) => {
                              this.changeElement(
                                Act.label,
                                e.target.value,
                                this.state.actividades_enseñanza,
                                1
                              );
                            }}
                          />
                        </ListItemEdit>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Desarrollo de competencias genéricas
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {this.state.desarrollo_competencias_genericas.map((Act) => {
                      return (
                        <ListItemEdit
                          key={Act.label}
                          label={Act.label}
                          Actividad={Act.actividad}
                          ultimo={
                            this.state.desarrollo_competencias_genericas.length
                          }
                          crear={() => {
                            this.addElement(
                              Act.actividad,
                              this.state.desarrollo_competencias_genericas,
                              2
                            );
                          }}
                          eliminar={() => {
                            this.deleteElement(
                              Act.label,
                              this.state.desarrollo_competencias_genericas,
                              2
                            );
                          }}
                        >
                          <TextField
                            type="text"
                            multiline={true}
                            fullWidth={true}
                            placeholder={Act.actividad}
                            defaultValue={Act.texto}
                            onBlur={(e) => {
                              this.changeElement(
                                Act.label,
                                e.target.value,
                                this.state.desarrollo_competencias_genericas,
                                2
                              );
                            }}
                          />
                        </ListItemEdit>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Indicadores de alcance
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {this.state.indicadoresalcance.map((Act) => {
                      return (
                        <ListItemEdit
                          key={Act.label}
                          label={Act.label}
                          mayus={true}
                          Actividad={Act.actividad}
                          ultimo={this.state.indicadoresalcance.length}
                          crear={() => {
                            this.addLetras();
                            this.addElement(
                              Act.actividad,
                              this.state.indicadoresalcance,
                              3
                            );
                          }}
                          eliminar={() => {
                            this.deleteLetras();
                            this.deleteElement(
                              Act.label,
                              this.state.indicadoresalcance,
                              3
                            );
                          }}
                        >
                          <TextField
                            type="text"
                            multiline={true}
                            fullWidth={true}
                            placeholder={Act.actividad}
                            defaultValue={Act.texto}
                            onBlur={(e) => {
                              this.changeElement(
                                Act.label,
                                e.target.value,
                                this.state.indicadoresalcance,
                                3
                              );
                            }}
                          />
                        </ListItemEdit>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Matriz de evaluación
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MatrizEvaluacion
                      columnas={this.state.indicadoresalcance}
                      filas={this.state.matriz}
                      eliminar={this.deleteRow}
                      suma={this.sumaPorcentaje}
                      sumaFila={this.sumaPorcentajeFila}
                      editar={this.changeRowData}
                      editarPonderacion={this.changePonderacionData}
                      /*editarNumero="" editarEvidencia=""*/
                    />
                    <IconButton
                      className={classes.addCircle}
                      onClick={() => {
                        this.addRow();
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Material de apoyo
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {this.state.material_apoyo.map((Act) => {
                        return (
                          <Grid item xs={6} key={Act.label}>
                            <ListItemEdit
                              key={Act.label}
                              label={Act.label}
                              mayus={true}
                              Actividad={Act.actividad}
                              ultimo={this.state.material_apoyo.length}
                              crear={() => {
                                this.addElement(
                                  Act.actividad,
                                  this.state.material_apoyo,
                                  4
                                );
                              }}
                              eliminar={() => {
                                this.deleteElement(
                                  Act.label,
                                  this.state.material_apoyo,
                                  4
                                );
                              }}
                            >
                              <TextField
                                type="text"
                                multiline={true}
                                fullWidth={true}
                                placeholder={Act.actividad}
                                defaultValue={Act.texto}
                                onBlur={(e) => {
                                  this.changeElement(
                                    Act.label,
                                    e.target.value,
                                    this.state.material_apoyo,
                                    4
                                  );
                                }}
                              />
                            </ListItemEdit>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    );
  }
}

TabPanelEdit.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default withStyles(useStyles)(TabPanelEdit);

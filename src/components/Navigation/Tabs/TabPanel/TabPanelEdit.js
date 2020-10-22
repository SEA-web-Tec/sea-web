import React, { useState } from "react";
import PropTypes from "prop-types";
import useStyles from "../Tabs.styles";

import {
  AppBar,
  Grid,
  Tabs,
  Tab,
  Typography,
  NativeSelect,
  Chip,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Paper,
} from "@material-ui/core";
import MaterialTable from "material-table";
import {
  ExpandMore as ExpandMoreIcon,
  //Feedback as FeedbackIcon,
} from "@material-ui/icons";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItemEdit from "../../../UI/ListItem/ListItemEdit";
import ChipEdit from "../../../UI/ChipEdit/ChipEdit";
import MatrizEvaluacion from "../../../UI/MaterialTable/MaterialTableEdit";

function letterValue(str) {
  var anum = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };
  return anum[str];
}

export default function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  const [rows, setMatriz] = useState([]);

  const [ActApr, setActApr] = useState([]);
  const [ActEns, setActEns] = useState([]);
  const [DesCom, setDesCom] = useState([]);
  const [IndAlc, setIndAlc] = useState([]);
  const [MatApo, setMatApo] = useState([]);

  const addRow = () => {
    var fila = {
      id: rows.length,
      evidencia: "Examen",
      evaluacion: "Lista de cotejo",
      porcentaje: 0,
    };
    IndAlc.forEach((element) => {
      var letra = letterValue(element.label);
      fila[letra] = 0;
    });
    var arreglo = [...rows];
    arreglo.push(fila);
    console.log(arreglo);
    setMatriz(arreglo);
  };

  const addLetras = () => {
    var arreglo = [];
    var letra = letterValue(IndAlc.length + 1);
    rows.forEach((element) => {
      var newFila = element;
      newFila[letra] = 0;
      arreglo.push(newFila);
    });
    console.log(arreglo);
    setMatriz(arreglo);
  };

  const deleteLetras = () => {
    var arreglo = [];
    rows.forEach((element) => {
      var letra = letterValue(IndAlc.length);
      var newFila = element;
      delete newFila[letra];
      arreglo.push(newFila);
    });
    console.log(arreglo);
    setMatriz(arreglo);
  };

  const deleteRow = (id) => {
    console.log(id);
    var arreglo = [...rows];
    arreglo.splice(id, 1);
    var arreglo2 = [];
    arreglo.forEach((element) => {
      if (element.id > id) {
        var cambio = element;
        cambio.id = element.id - 1;
        arreglo2.push(cambio);
      } else arreglo2.push(element);
    });
    setMatriz(arreglo2);
  };

  const changeRowData = (id, campo, dato) => {
    var arreglo = [...rows];
    arreglo[id][campo] = dato;
    console.log(arreglo);
    setMatriz(arreglo);
  };

  const addElement = (actividad2, arrg, caso) => {
    var arreglo = [...arrg];
    arreglo.push({
      label: arrg.length + 1,
      actividad: actividad2,
      texto: "",
    });
    ingresar(caso, arreglo);
  };

  const changeElement = (label, text, arrg, caso) => {
    var arreglo = [...arrg];
    arreglo[label - 1].texto = text;
    ingresar(caso, arreglo);
  };

  const deleteElement = (label, arrg, caso) => {
    var arreglo = [...arrg];
    arreglo.splice(label - 1, 1);
    var arreglo2 = [];
    arreglo.forEach((element) => {
      if (element.label > label) {
        var cambio = element;
        cambio.label = element.label - 1;
        arreglo2.push(cambio);
      } else arreglo2.push(element);
    });
    ingresar(caso, arreglo2);
  };

  const ingresar = (caso, arreglo) => {
    switch (caso) {
      case 0:
        setActApr(arreglo);
        break;
      case 1:
        setActEns(arreglo);
        break;
      case 2:
        setDesCom(arreglo);
        break;
      case 3:
        setIndAlc(arreglo);
        break;
      case 4:
        setMatApo(arreglo);
        break;
      default:
        break;
    }
  };

  if (ActApr.length === 0) {
    addElement("Actividad de Aprendizaje", ActApr, 0);
  }
  if (ActEns.length === 0) {
    addElement("Actividad de Enseñanza", ActEns, 1);
  }
  if (DesCom.length === 0) {
    addElement("Desarrollo de Competencias Genericas", DesCom, 2);
  }
  if (IndAlc.length === 0) {
    addElement("Indicadored de Alcance", IndAlc, 3);
  }
  if (MatApo.length === 0) {
    addElement("Material de Apoyo", MatApo, 4);
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
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
                <ChipEdit label="Semanas de clase" numeros={[1, 2]} />
                <ChipEdit label="Semanas de evaluación" numeros={[1, 2]} />
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
                  {ActApr.map((Act) => {
                    return (
                      <ListItemEdit
                        key={Act.label}
                        label={Act.label}
                        Actividad={Act.actividad}
                        ultimo={ActApr.length}
                        crear={() => {
                          addElement(Act.actividad, ActApr, 0);
                        }}
                        eliminar={() => {
                          deleteElement(Act.label, ActApr, 0);
                        }}
                      >
                        <TextField
                          type="text"
                          multiline={true}
                          fullWidth={true}
                          placeholder={Act.actividad}
                          value={Act.texto}
                          onChange={(e) => {
                            changeElement(Act.label, e.target.value, ActApr, 0);
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
                  {ActEns.map((Act) => {
                    return (
                      <ListItemEdit
                        key={Act.label}
                        label={Act.label}
                        Actividad={Act.actividad}
                        ultimo={ActEns.length}
                        crear={() => {
                          addElement(Act.actividad, ActEns, 1);
                        }}
                        eliminar={() => {
                          deleteElement(Act.label, ActEns, 1);
                        }}
                      >
                        <TextField
                          type="text"
                          multiline={true}
                          fullWidth={true}
                          placeholder={Act.actividad}
                          value={Act.texto}
                          onChange={(e) => {
                            changeElement(Act.label, e.target.value, ActEns, 1);
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
                  {DesCom.map((Act) => {
                    return (
                      <ListItemEdit
                        key={Act.label}
                        label={Act.label}
                        Actividad={Act.actividad}
                        ultimo={DesCom.length}
                        crear={() => {
                          addElement(Act.actividad, DesCom, 2);
                        }}
                        eliminar={() => {
                          deleteElement(Act.label, DesCom, 2);
                        }}
                      >
                        <TextField
                          type="text"
                          multiline={true}
                          fullWidth={true}
                          placeholder={Act.actividad}
                          value={Act.texto}
                          onChange={(e) => {
                            changeElement(Act.label, e.target.value, DesCom, 2);
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
                  {IndAlc.map((Act) => {
                    return (
                      <ListItemEdit
                        key={Act.label}
                        label={Act.label}
                        mayus={true}
                        Actividad={Act.actividad}
                        ultimo={IndAlc.length}
                        crear={() => {
                          addLetras();
                          addElement(Act.actividad, IndAlc, 3);
                        }}
                        eliminar={() => {
                          deleteLetras();
                          deleteElement(Act.label, IndAlc, 3);
                        }}
                      >
                        <TextField
                          type="text"
                          multiline={true}
                          fullWidth={true}
                          placeholder={Act.actividad}
                          value={Act.texto}
                          onChange={(e) => {
                            changeElement(Act.label, e.target.value, IndAlc, 3);
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
                    columnas={IndAlc}
                    filas={rows}
                    eliminar={deleteRow}
                    editar={
                      changeRowData
                    } /*editarNumero="" editarEvidencia=""*/
                  />
                  <IconButton
                    className={classes.addCircle}
                    onClick={() => {
                      addRow();
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
                    {MatApo.map((Act) => {
                      return (
                        <Grid item xs={6}>
                          <ListItemEdit
                            key={Act.label}
                            label={Act.label}
                            mayus={true}
                            Actividad={Act.actividad}
                            ultimo={MatApo.length}
                            crear={() => {
                              addElement(Act.actividad, MatApo, 4);
                            }}
                            eliminar={() => {
                              deleteElement(Act.label, MatApo, 4);
                            }}
                          >
                            <TextField
                              type="text"
                              multiline={true}
                              fullWidth={true}
                              placeholder={Act.actividad}
                              value={Act.texto}
                              onChange={(e) => {
                                changeElement(
                                  Act.label,
                                  e.target.value,
                                  MatApo,
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

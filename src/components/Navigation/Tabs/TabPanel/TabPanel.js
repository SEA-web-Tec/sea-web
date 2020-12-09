import React, { useState } from "react";
import PropTypes from "prop-types";
import useStyles from "../Tabs.styles";

import {
  Grid,
  Typography,
  Chip,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
} from "@material-ui/core";

import { Feedback as FeedbackIcon } from "@material-ui/icons";

import MaterialTable from "material-table";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import ListItem from "../../../UI/ListItem/ListItem";
import letterValue from "shared/LetterValue";
import MatrizEvaluacion from "../../../UI/MaterialTable/MaterialTable";

export default function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  const [matriz, setMatriz] = useState([]);

  const [actividades_aprendizaje, setactividades_aprendizaje] = useState([]); //unidades
  const [actividades_enseñanza, setactividades_enseñanza] = useState([]); //unidades
  const [
    desarrollo_competencias_genericas,
    setdesarrollo_competencias_genericas,
  ] = useState([]); //unidades
  const [indicadoresalcance, setindicadoresalcance] = useState([]); //indicadoresalcance
  const [material_apoyo, setmaterial_apoyo] = useState([]); //unidades

  const addRow = () => {
    var fila = {
      //evidencias
      id: matriz.length,
      evidencia: "Examen", //nombre evidencia
      evaluacion: "Lista de cotejo", //evaluacion_formativa
      porcentaje: 0, //agregar
      indicadores: {B:0}, //indicadores
    };
    indicadoresalcance.forEach((element) => {
      var letra = letterValue(element.label);
      fila.indicadores[letra] = 0; //ponderacion
    });
    console.log(fila);
    var arreglo = [...matriz];
    arreglo.push(fila);
    setMatriz(arreglo);
  };

  const addElement = (actividad2, texto, arrg, caso) => {
    var arreglo = [...arrg];
    arreglo.push({
      label: arrg.length + 1,
      actividad: actividad2,
      texto: texto,
    });
    ingresar(caso, arreglo);
  };

  const ingresar = (caso, arreglo) => {
    switch (caso) {
      case 0:
        setactividades_aprendizaje(arreglo);
        break;
      case 1:
        setactividades_enseñanza(arreglo);
        break;
      case 2:
        setdesarrollo_competencias_genericas(arreglo);
        break;
      case 3:
        setindicadoresalcance(arreglo);
        break;
      case 4:
        setmaterial_apoyo(arreglo);
        break;
      default:
        break;
    }
  };

  if (actividades_aprendizaje.length === 0) {
    addElement(
      "Actividad de Aprendizaje",
      "Ejemplo Actividad de Aprendizaje",
      actividades_aprendizaje,
      0
    );
  }
  if (actividades_enseñanza.length === 0) {
    addElement(
      "Actividad de Enseñanza",
      "Ejemplo Actividad de Enseñanza",
      actividades_enseñanza,
      1
    );
  }
  if (desarrollo_competencias_genericas.length === 0) {
    addElement(
      "Desarrollo de Competencias Genericas",
      "Desarrollo de Competencias Genericas",
      desarrollo_competencias_genericas,
      2
    );
  }
  if (indicadoresalcance.length <= 1) {
    addElement(
      "Indicadored de Alcance",
      "Ejemplo Indicadore de Alcance " + indicadoresalcance.length,
      indicadoresalcance,
      3
    );
    if (indicadoresalcance.length == 1) {
      addRow();
    }
  }
  if (material_apoyo.length <= 3) {
    addElement("Material de Apoyo", "Material de Apoyo", material_apoyo, 4);
  }
  var feedback = "";
  if (props.evaluar) {
    var feedback = (
      <IconButton className={classes.expanderFeedback}>
        <FeedbackIcon />
      </IconButton>
    );
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
                {feedback}
                <Chip
                  className={classes.semanasChip}
                  avatar={<Avatar>4</Avatar>}
                  label="Semanas de clase"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  className={classes.semanasChip}
                  avatar={<Avatar>2</Avatar>}
                  label="Semanas de evaluación"
                  color="primary"
                  variant="outlined"
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
                  {actividades_aprendizaje.map((Act) => {
                    return (
                      <ListItem
                        key={"actividades_aprendizaje" + Act.label}
                        label={Act.label}
                        content={Act.texto}
                      ></ListItem>
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
                  {actividades_enseñanza.map((Act) => {
                    return (
                      <ListItem
                        key={"actividades_enseñanza" + Act.label}
                        label={Act.label}
                        content={Act.texto}
                      ></ListItem>
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
                  {desarrollo_competencias_genericas.map((Act) => {
                    return (
                      <ListItem
                        key={"desarrollo_competencias_genericas" + Act.label}
                        label={Act.label}
                        content={Act.texto}
                      ></ListItem>
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
                  {indicadoresalcance.map((Act) => {
                    return (
                      <ListItem
                        key={"indicadoresalcance" + Act.label}
                        label={letterValue(Act.label)}
                        content={Act.texto}
                      ></ListItem>
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
                    columnas={indicadoresalcance}
                    filas={matriz}
                  />
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
                  <Grid container spacing={3}>
                    {material_apoyo.map((Act) => {
                      return (
                        <Grid key={"material_apoyo" + Act.label} item xs={6}>
                          <ListItem
                            key={Act.label}
                            label={letterValue(Act.label)}
                            content={Act.texto}
                          ></ListItem>
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

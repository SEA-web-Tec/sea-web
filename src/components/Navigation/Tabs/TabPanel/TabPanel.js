import React, { useState } from "react";
import PropTypes from "prop-types";
import useStyles from "./TabPanelEdit.styles";

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
  const [cerrar, setcerrar] = useState(false);

  const addRow = () => {
    var fila = {
      //evidencias
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
    indicadoresalcance.forEach((element) => {
      var letra = letterValue(element.label);
      fila.indicadoresponderacion[letra] = 0;
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

  const changeElementInicio = (arrg, arrgMod) => {
    var arreglo = JSON.parse(JSON.stringify(arrg));
    for (let i = 0; i < arrgMod.length; i++) {
      arreglo.push(arrgMod[i]);
    }
    return arreglo;
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

  //actividades_aprendizaje
  if (
    props.ins_unidad.unidades.actividades_aprendizaje.length != 0 &&
    actividades_aprendizaje.length === 0
  ) {
    setactividades_aprendizaje(
      JSON.parse(
        JSON.stringify(props.ins_unidad.unidades.actividades_aprendizaje)
      )
    );
  } else if (actividades_aprendizaje.length === 0) {
    addElement(
      "Actividad de Aprendizaje",
      "Sin intrumentacion",
      actividades_aprendizaje,
      0
    );
  }
  //actividades_enseñanza
  if (
    props.ins_unidad.unidades.actividades_enseñanza.length != 0 &&
    actividades_enseñanza.length === 0
  ) {
    setactividades_enseñanza(
      JSON.parse(
        JSON.stringify(props.ins_unidad.unidades.actividades_enseñanza)
      )
    );
  } else if (actividades_enseñanza.length === 0) {
    console.log("entre");
    addElement(
      "Actividad de Enseñanza",
      "Sin intrumentacion",
      actividades_enseñanza,
      1
    );
  }
  //desarrollo_competencias_genericas
  if (
    props.ins_unidad.unidades.desarrollo_competencias_genericas.length != 0 &&
    desarrollo_competencias_genericas.length === 0
  ) {
    setdesarrollo_competencias_genericas(
      JSON.parse(
        JSON.stringify(
          props.ins_unidad.unidades.desarrollo_competencias_genericas
        )
      )
    );
  } else if (desarrollo_competencias_genericas.length === 0) {
    addElement(
      "Desarrollo de Competencias Genericas",
      "Sin intrumentacion",
      desarrollo_competencias_genericas,
      2
    );
  }
  //indicadoresalcance es distinto
  if (
    props.ins_unidad.indicadoresalcance.length != 0 &&
    indicadoresalcance.length === 0
  ) {
    setindicadoresalcance(
      JSON.parse(JSON.stringify(props.ins_unidad.indicadoresalcance))
    );
  } else if (indicadoresalcance.length === 0) {
    addElement(
      "Indicadores de Alcance",
      "Sin intrumentacion",
      indicadoresalcance,
      3
    );
  }
  //Material de apoyo
  if (
    props.ins_unidad.unidades.material_apoyo.length != 0 &&
    material_apoyo.length === 0
  ) {
    setmaterial_apoyo(
      JSON.parse(JSON.stringify(props.ins_unidad.unidades.material_apoyo))
    );
  } else if (material_apoyo.length === 0) {
    addElement("Material de Apoyo", "Sin intrumentacion", material_apoyo, 4);
  }
  ///Matriz
  if (props.ins_unidad.matriz.length !== 0 && !cerrar && matriz.length === 0) {
    setcerrar(true);
    setMatriz(JSON.parse(JSON.stringify(props.ins_unidad.matriz)));
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
                <Chip
                  className={classes.semanasChip}
                  avatar={
                    <Avatar>{props.ins_unidad.unidades.semana_clases}</Avatar>
                  }
                  label="Semanas de clase"
                  variant="outlined"
                />
                <Chip
                  className={classes.semanasChip}
                  avatar={
                    <Avatar>
                      {props.ins_unidad.unidades.semana_evaluacion}
                    </Avatar>
                  }
                  label="Semanas de evaluación"
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
                    numero={props.index}
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

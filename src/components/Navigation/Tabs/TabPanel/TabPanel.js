import React from "react";
import PropTypes from "prop-types";
import useStyles from "../Tabs.styles";

import {
  AppBar,
  Grid,
  Tabs,
  Tab,
  Typography,
  Chip,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  /*IconButton,*/
  Paper,
} from "@material-ui/core";
import MaterialTable from "material-table";
import {
  ExpandMore as ExpandMoreIcon,
  //Feedback as FeedbackIcon,
} from "@material-ui/icons";

import ListItem from "../../../UI/ListItem/ListItem";

export default function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  const state = {
    tabla: [
      {
        label: 1,
        letra: "A",
        content: "Este es un ejemplo de una actividad",
      },
      {
        label: 2,
        letra: "B",
        content: "Este es un ejemplo de una actividad",
      },
      {
        label: 3,
        letra: "C",
        content: "Este es un ejemplo de una actividad",
      },
    ],
  };

  var ejemploNumero = state.tabla.map((elemento) => {
    return <ListItem label={elemento.label} content={elemento.content} />;
  });

  var ejemploLetra = state.tabla.map((elemento) => {
    return <ListItem label={elemento.letra} content={elemento.content} />;
  });

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
                  {ejemploNumero}
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
                  {ejemploNumero}
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
                  {ejemploNumero}
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
                  {ejemploLetra}
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
                  <MaterialTable
                    columns={[
                      {
                        title: "Evidencia de aprendizaje",
                        field: "evidenciaAprendizaje",
                        lookup: {
                          0: "Examen",
                          1: "Ejercicio",
                          2: "Proyecto",
                          3: "Exposición",
                          4: "Otro",
                        },
                        align: "center",
                      },
                      {
                        title: "%",
                        field: "porcentaje",
                        type: "numeric",
                        align: "center",
                      },
                      {
                        title: "A",
                        field: "A",
                        type: "numeric",
                        align: "center",
                      },
                      {
                        title: "B",
                        field: "B",
                        type: "numeric",
                        align: "center",
                      },
                      {
                        title: "C",
                        field: "C",
                        type: "numeric",
                        align: "center",
                      },
                      {
                        title: "D",
                        field: "D",
                        type: "numeric",
                        align: "center",
                      },
                      {
                        title: "Evaluación formativa de la competencia",
                        field: "evaluacionFormativa",
                        lookup: {
                          0: "Cuestionario",
                          1: "Lista de cotejo",
                          2: "Lista de observación",
                          3: "Rubrica",
                        },
                        align: "center",
                      },
                    ]}
                    data={[
                      {
                        evidenciaAprendizaje: 0,
                        porcentaje: 100,
                        A: 10,
                        B: 40,
                        C: 30,
                        D: 20,
                        evaluacionFormativa: 1,
                      },
                      {
                        evidenciaAprendizaje: 3,
                        porcentaje: 100,
                        A: 10,
                        B: 20,
                        C: 30,
                        D: 40,
                        evaluacionFormativa: 0,
                      },
                      {
                        evidenciaAprendizaje: 4,
                        porcentaje: 100,
                        A: 80,
                        B: 10,
                        C: 5,
                        D: 5,
                        evaluacionFormativa: 1,
                      },
                      {
                        evidenciaAprendizaje: 2,
                        porcentaje: 100,
                        A: 25,
                        B: 25,
                        C: 25,
                        D: 25,
                        evaluacionFormativa: 0,
                      },
                      {
                        evidenciaAprendizaje: 2,
                        porcentaje: 100,
                        A: 10,
                        B: 40,
                        C: 30,
                        D: 20,
                        evaluacionFormativa: 2,
                      },
                    ]}
                    components={{
                      Container: (props) => (
                        <Paper
                          {...props}
                          elevation={0}
                          style={{ width: "100%" }}
                        />
                      ),
                    }}
                    options={{
                      draggable: false,
                      filtering: false,
                      fixedColumns: {
                        left: 1,
                        right: 1,
                      },
                      paging: false,
                      search: false,
                      sorting: false,
                      toolbar: false,
                    }}
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
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 1</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 2</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 3</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 4</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 5</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 6</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 7</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 8</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography>Material 9</Typography>
                      </Paper>
                    </Grid>
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

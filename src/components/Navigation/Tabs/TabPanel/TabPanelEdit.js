import React from "react";
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
    Paper,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import ListItemEdit from "../../../UI/ListItem/ListItemEdit";
import ChipEdit from "../../../UI/ChipEdit/ChipEdit";

export default function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    const state = {
        actividadesAprendizaje: [],
        actividadesEns: [{ label: 1, icon: true }],
        desarrolloCompGen: [],
        indAlc: ["A", "B", "C"],
    };

    var actividadesAprendizaje = "";
    var actividadesEns = "";
    var desarrolloCompGen = "";
    var indAlc = "";
    var matrizEva = "";
    var materialApoyo = "";

    if (actividadesAprendizaje === "") {
        actividadesAprendizaje = (
            <ListItemEdit
                label={1}
                Actividad="Actividad de Aprendizaje"
                icon={true}
            />
        );
    }
    if (actividadesEns === "") {
        actividadesEns = (
            <ListItemEdit
                label={1}
                Actividad="Actividad de Enseñanza"
                icon={true}
            />
        );
    }
    if (desarrolloCompGen === "") {
        desarrolloCompGen = (
            <ListItemEdit
                label={1}
                Actividad="Desarrollo de competencias genericas"
                icon={true}
            />
        );
    }
    if (indAlc === "") {
        indAlc = state.indAlc.map((letra) => {
            return (
                <ListItemEdit
                    label={letra}
                    Actividad="Indicador de Alcance"
                    icon={true}
                />
            );
        });
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2} className={classes.box}>
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
                                    numeros={[1, 2]}
                                />
                                <ChipEdit
                                    label="Semanas de evaluación"
                                    numeros={[1, 2]}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.contentGrid}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Actividades de Aprendizaje
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ flexDirection: "column" }}
                                >
                                    {actividadesAprendizaje}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Actividades de Enseñanza
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ flexDirection: "column" }}
                                >
                                    {actividadesEns}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Desarrollo de competencias genéricas
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ flexDirection: "column" }}
                                >
                                    {desarrolloCompGen}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Indicadores de alcance
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ flexDirection: "column" }}
                                >
                                    {indAlc}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Matriz de evaluación
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MaterialTable
                                        columns={[
                                            {
                                                title:
                                                    "Evidencia de aprendizaje",
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
                                                title:
                                                    "Evaluación formativa de la competencia",
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
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Material de apoyo
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 1
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 2
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 3
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 4
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 5
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 6
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 7
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 8
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Paper className={classes.paper}>
                                                <Typography>
                                                    Material 9
                                                </Typography>
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

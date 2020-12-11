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
            B: 0,
        };
        IndAlc.forEach((element) => {
            var letra = letterValue(element.label);
            fila[letra] = 0;
        });
        var arreglo = [...rows];
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
        addElement(
            "Actividad de Aprendizaje",
            "Ejemplo Actividad de Aprendizaje",
            ActApr,
            0
        );
    }
    if (ActEns.length === 0) {
        addElement(
            "Actividad de Enseñanza",
            "Ejemplo Actividad de Enseñanza",
            ActEns,
            1
        );
    }
    if (DesCom.length === 0) {
        addElement(
            "Desarrollo de Competencias Genericas",
            "Desarrollo de Competencias Genericas",
            DesCom,
            2
        );
    }
    if (IndAlc.length <= 1) {
        addElement(
            "Indicadored de Alcance",
            "Ejemplo Indicadore de Alcance " + IndAlc.length,
            IndAlc,
            3
        );
        if (IndAlc.length == 1) {
            addRow();
        }
    }
    if (MatApo.length <= 3) {
        addElement("Material de Apoyo", "Material de Apoyo", MatApo, 4);
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
                                    {ActApr.map((Act) => {
                                        return (
                                            <ListItem
                                                key={"ActApr" + Act.label}
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
                                    {ActEns.map((Act) => {
                                        return (
                                            <ListItem
                                                key={"ActEns" + Act.label}
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
                                    {DesCom.map((Act) => {
                                        return (
                                            <ListItem
                                                key={"DesCom" + Act.label}
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
                                    {IndAlc.map((Act) => {
                                        return (
                                            <ListItem
                                                key={"IndAlc" + Act.label}
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
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography className={classes.heading}>
                                        Matriz de evaluación
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MatrizEvaluacion
                                        columnas={IndAlc}
                                        filas={rows}
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
                                        {MatApo.map((Act) => {
                                            return (
                                                <Grid
                                                    key={"MatApo" + Act.label}
                                                    item
                                                    xs={6}
                                                >
                                                    <ListItem
                                                        key={Act.label}
                                                        label={letterValue(
                                                            Act.label
                                                        )}
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

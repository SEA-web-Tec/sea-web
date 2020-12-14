import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {  Grid, Typography, Box, IconButton, Accordion, AccordionSummary,
    AccordionDetails, AccordionActions, Divider } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon, 
        Edit as EditIcon,
        Check as CheckIcon,
        Close as CloseIcon,
        ArrowBackIos as ArrowBackIosIcon,
        ArrowForwardIos as ArrowForwardIosIcon
    } from '@material-ui/icons';
import Portada from "../../../components/Portada/Portada";
import ExamenesTable from "../../../components/Examenes/ExamenesTable/Table";

const handleClickNext = (n) => {
    // retroceder
};

const handleClickPrevious = (n) => {
    // avanzar
};

class Resultados extends Component {
    render(props) {
        const { classes } = this.props;
        let n = 0; // Reactivos: 0-Abierto 1-f/v 2-múltiple
        const encabezados = ["Nombre del alumno","Respuesta","Calificación","Vista"];
        const resultados = [{
            texto_reactivo: "¿En qué sistema está basado Android?",
                tipo: "abierto",
                respuesta_correcta: null,
                respuestas: [ {
                    key: 1,
                    nombre:"Silvia Patricia Pérez Escobedo",
                    respuesta_alumno: "Chocolate",
                    puntaje: 78
                }, {
                    key: 2,
                    nombre:"Salvador de Jesús Gómez Cuevas",
                    respuesta_alumno: "uwu",
                    puntaje: null
                }, {
                    key: 3,
                    nombre:"Edson David Puente Guerrero",
                    respuesta_alumno: "-",
                    puntaje: null
                }, {
                    key: 4,
                    nombre:"Derek Allan Solano Gonzáles",
                    respuesta_alumno: "owo",
                    puntaje: 76
                }, {
                    key: 5,
                    nombre:"Carlos de Jesús Benoit Mendivil",
                    respuesta_alumno: "Malvavisco",
                    puntaje: 0
                },{
                    key: 6,
                    nombre:"David Sebastian Neri Olguín",
                    respuesta_alumno: "Malvavisco",
                    puntaje: 67
                },{
                    key: 7,
                    nombre:"Remene Miguel Ramírez Cervantes",
                    respuesta_alumno: "Malvavisco",
                    puntaje: 0
                },{
                    key: 8,
                    nombre:"Julio Cesar Sandoval Sánchez",
                    respuesta_alumno: "Malvavisco",
                    puntaje: null
                }]
            }, {
                texto_reactivo: "Un IDE es un entorno de programación que ha sido empaquetado como un programa de aplicación.",
                tipo: "falso_verdadero",
                respuesta_correcta: "Verdadero",
                respuestas: [ {
                    key: 1,
                    nombre:"Silvia Patricia Pérez Escoedo",
                    respuesta_alumno: "Falso",
                    puntaje: 12
                }, {
                    key: 2,
                    nombre:"Salvador de Jesús Gómez Cuevas",
                    respuesta_alumno: "Verdadero",
                    puntaje: 32
                }, {
                    key: 3,
                    nombre:"Edson David Guerrero Puente",
                    respuesta_alumno: "Verdadero",
                    puntaje: 56
                }, {
                    key: 4,
                    nombre:"Derek Alan Solano",
                    respuesta_alumno: "Falso",
                    puntaje: 76
                }, {
                    key: 5,
                    nombre:"Carlos de Jesús Benoit Mendivil",
                    respuesta_alumno: "Falso",
                    puntaje: 2
                }]
            }, {
                texto_reactivo: "¿De quien depende Android para los servicios base del sistema como seguridad, gestión de memoria, gestión de procesos, pila de red y modelo de controladores?",
                tipo: "opcion_multiple",
                respuesta_correcta: "Linux",
                respuestas: [ {
                    key: 1,
                    nombre:"Silvia Patricia Pérez Escoedo",
                    respuesta_alumno: "Java",
                    puntaje: 12
                }, {
                    key: 2,
                    nombre:"Salvador de Jesús Gómez Cuevas",
                    respuesta_alumno: "Linux",
                    puntaje: 32
                }, {
                    key: 3,
                    nombre:"Edson David Guerrero Puente",
                    respuesta_alumno: "Java",
                    puntaje: 56
                }, {
                    key: 4,
                    nombre:"Derek Alan Solano",
                    respuesta_alumno: "C",
                    puntaje: 76
                }, {
                    key: 5,
                    nombre:"Carlos de Jesús Benoit Mendivil",
                    respuesta_alumno: "C++",
                    puntaje: 2
                }]
            }
        ];
        return (
            <Portada
                materia="Programación de Dispositivos Móviles"
                carrera="Ing. Sistemas Computacionales"
                maestro="José Tadeo Rodriguez Solano"
                grupo="F"
                periodo="Enero - Junio 2020">
                <Grid className={classes.navigation}>
                    <Typography className={classes.titulo} variant="h6" component="h6">
                        Unidad 1. Introducción a las tecnologías de dispositivos móviles
                    </Typography>
                    <Grid className={classes.navigation}>
                        <IconButton>
                            <ArrowBackIosIcon color="primary" onClick={handleClickNext}/>
                        </IconButton> 
                        <IconButton>
                            <ArrowForwardIosIcon color="primary" onClick={handleClickPrevious}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography className={classes.ask} variant="h6" component="h6">
                        { (n+1) + ") " + resultados[n].texto_reactivo }
                    </Typography>
                    <Accordion defaultExpanded className={classes.root}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box component="div" className={classes.headExpand}>
                                <Box component="div">
                                    <Typography className={classes.heading}>Respuesta</Typography>
                                </Box>
                                <Box component="div">
                                    <AccordionActions>
                                        <IconButton>
                                            <EditIcon className={classes.iconEdit}/>
                                        </IconButton>
                                    </AccordionActions>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <Divider/>
                        <AccordionDetails>
                            <Box component="div">
                                <Typography className={classes.answer}>
                                    Aquí se vería la respuesta que el alumno eligió o ingresó, debe aparecer 
                                    al dar click sobre un alumno y deberá aparecer por default la respuesta defecto
                                    la respuesta del primer alumno: { resultados[n].respuestas[0].respuesta_alumno }.
                                </Typography>
                            </Box>
                        </AccordionDetails>
                        <AccordionActions>
                            { resultados[n].respuesta_correcta == null ? <>
                                <Typography  variant="caption">Asignar calificación:</Typography>
                                <Box component="div">
                                    <IconButton size="small">
                                        <CloseIcon className={classes.iconIncorrect}/>
                                    </IconButton>
                                </Box>
                                <Box component="div">
                                    <IconButton size="small">
                                        <CheckIcon className={classes.iconCorrect}/>
                                    </IconButton>
                                </Box>
                            </> : <Typography  variant="caption">Respuesta correcta: { resultados[n].respuesta_correcta }</Typography> }
                        </AccordionActions>
                    </Accordion>
                    <Accordion defaultExpanded className={classes.root}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Lista de alumnos</Typography>
                        </AccordionSummary>
                        <Divider/>
                        <AccordionDetails>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ExamenesTable data={resultados[n]} headers={encabezados} type="resultados"/>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Portada>
        );
    }
}

export default withStyles(useStyles)(Resultados);
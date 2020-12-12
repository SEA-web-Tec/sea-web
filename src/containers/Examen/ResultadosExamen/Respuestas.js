import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {  Grid, Typography } from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import ExamenesTable from "../../../components/Examenes/ExamenesTable/Table";

class Respuestas extends Component {
    render(props) {
        const { classes } = this.props;
        let nombre = "Andrea Vargas Castro";
        const encabezados = ["Reactivo","Respuesta","Puntaje"];
        const calificacion = 89;
        const respuestas = [{
                key: 1,
                texto_reactivo: "¿En qué sistema está basado Android?",
                respuesta_alumno: "Chocolate",
                puntaje: 77
            }, {
                key: 2,
                texto_reactivo: "Un IDE es un entorno de programación que ha sido empaquetado como un programa de aplicación.",
                respuesta_alumno: "Falso",
                puntaje: 13
            }, {
                key: 3,
                texto_reactivo: "¿De quien depende Android para los servicios base del sistema como seguridad, gestión de memoria, gestión de procesos, pila de red y modelo de controladores?",
                respuesta_alumno: "Java",
                puntaje: 10
            }];
        return (
            <Portada
                materia="Programación de Dispositivos Móviles"
                carrera="Ing. Sistemas Computacionales"
                maestro="José Tadeo Rodriguez Solano"
                grupo="F"
                periodo="Enero - Junio 2020">
                <Typography className={classes.titulo} variant="h6" component="h6">
                    Exam 2020 - Grupo F
                </Typography>
                <Grid container>
                    <div>
                        <Typography className={classes.ask} variant="h6" component="h6">
                            Estudiante: { nombre }
                        </Typography>
                        <Typography className={classes.ask} variant="h6" component="h6">
                            Calificación: { calificacion }
                        </Typography>
                    </div>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ExamenesTable data={respuestas} headers={encabezados} type="respuesta"/>
                    </Grid>
                </Grid>
            </Portada>
        );
    }
}

export default withStyles(useStyles)(Respuestas);
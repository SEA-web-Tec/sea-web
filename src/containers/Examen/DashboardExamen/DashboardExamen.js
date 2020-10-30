import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, Accordion, AccordionDetails, AccordionSummary, Box, IconButton } from "@material-ui/core";
import Portada from "components/Portada/Portada";
import ExamenesAccordion from "components/Examenes/ExamenesAccordion/ExamenesAccordion";

class DashboardExamen extends Component {
  render(props) {
    const { classes } = this.props;

    return (
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
        // hasTabs
      >
        <Typography className={classes.Titulo} variant="h6" component="h6" gutterBottom>
          Introducción a la programación de dispositivos móviles
        </Typography>
        <ExamenesAccordion nombreExamen="Examen U1 PDM" />
        <ExamenesAccordion nombreExamen="Examen U2 PDM" />
        <ExamenesAccordion nombreExamen="Examen U3 PDM" />
      </Portada>
    );
  }
}

export default withStyles(useStyles)(DashboardExamen);

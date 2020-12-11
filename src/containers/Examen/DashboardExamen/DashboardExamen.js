import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  ExpandMore as ExpandMoreIcon,
  Create as CreateIcon,
  GroupAdd as GroupAddIcon,
  Delete as DeleteIcon } from "@material-ui/icons";
import { Typography, Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Divider} from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import ExamenesTable from "../../../components/Examenes/ExamenesTable/Table";
import FloatingButton from "../../../components/Examenes/ExamFloatingButton/FloatingButton";

class DashboardExamen extends Component {
  render(props) {
    const { classes } = this.props;
    const encabezados = ["Grupo","Fecha","Estado","Calificaciones"];
    const examenes = [{
      key:1,
      grupo: "F", // no se almacena D:
      fin: "10/04/2021",
      estado: "Abierto"
    }, {
      key:2,
      grupo: "G", 
      fin: "12/04/2021",
      estado: "Abierto"
    }, {
      key:3,
      grupo: "H", 
      fin: "12/12/2020",
      estado: "Cerrado"
    }, {
      key:4,
      grupo: "G", 
      fin: "03/10/2020",
      estado: "Cerrado"
    }, {
      key:5,
      grupo: "E", 
      fin: "09/07/2020",
      estado: "Cerrado"
    }, {
      key:6,
      grupo: "E", 
      fin: "22/07/2019",
      estado: "Cerrado"
    }];
    return (
      <>
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
        // hasTabs
      >
        <Typography className={classes.titulo} variant="h6" component="h6">
          Introducción a la programación de dispositivos móviles
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box component="div" className={classes.examenList}>
              <Box component="div">
                <Typography>
                  {/* // Cambiarse a futuro por prop */}
                  Examen U1 PDM
                </Typography>
              </Box>
              <Box component="div">
                <IconButton color="secondary">
                  <CreateIcon />
                </IconButton>
                <IconButton color="secondary">
                  <GroupAddIcon />
                </IconButton>
                <IconButton color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails>
            <ExamenesTable data={examenes} headers={encabezados} type="examenes"/>
          </AccordionDetails>
        </Accordion>
      </Portada>
      <FloatingButton reactivos={false}/>
      </>
    );
  }
}

export default withStyles(useStyles)(DashboardExamen);
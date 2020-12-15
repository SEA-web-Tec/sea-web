import React, { Component } from "react";
import { http } from "shared/http";
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
  state = {
    examenes: []
  }
  componentDidMount() {
    let url = "/examenes/" + this.props.match.params.materia_id;
    const idData = {
    };
    http.get(url, idData)
      .then((response) => {
        this.setState({
          examenes: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render(props) {
    const { classes } = this.props;
    const encabezados = ["Grupo","Fecha","Estado","Calificaciones"];
    const asignaciones = [{
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
        {this.state.examenes.map((exam) => {
          return (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box component="div" className={classes.examenList}>
                <Box component="div">
                  <Typography>
                    Unidad {exam.unidad}: { exam.nombre }
                  </Typography>
                </Box>
                <Box component="div">
                  <IconButton className={classes.icons}>
                    <CreateIcon />
                  </IconButton>
                  <IconButton className={classes.icons}>
                    <GroupAddIcon />
                  </IconButton>
                  <IconButton className={classes.icons}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <Divider/>
            <AccordionDetails>
              <ExamenesTable data={asignaciones} headers={encabezados} type="examenes"/>
            </AccordionDetails>
          </Accordion>
        )})}
      </Portada>
      <FloatingButton reactivos={false} id={this.props.match.params.materia_id}/>
      </>
    );
  }
}

export default withStyles(useStyles)(DashboardExamen);
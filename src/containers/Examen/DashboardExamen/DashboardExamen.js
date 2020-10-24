import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  GroupAdd as GroupAddIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";
import { Typography, Accordion, AccordionDetails, AccordionSummary, Box, IconButton } from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import ExamenesList from "components/Examenes/ExamenesList/ExamenesList";

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
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="secondary">
                  <CreateIcon />
                </IconButton>
                <IconButton color="secondary">
                  <GroupAddIcon />
                </IconButton>
                <IconButton color="secondary">
                  <GetAppIcon />
                </IconButton>
                <IconButton color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ExamenesList />
          </AccordionDetails>
        </Accordion>
      </Portada>
    );
  }
}

export default withStyles(useStyles)(DashboardExamen);

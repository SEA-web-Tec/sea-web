import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Portada from "../../../components/Portada/Portada";
import AsignarTransferList from "components/Examenes/AsignarTransferList/AsignarTransferList";
// import TransferList from "../../../components/UI/TransferList/TransferList";

class Examenes extends Component {
  render(props) {
    const { classes } = this.props;

    return (
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
      >
        <Typography className={classes.title} variant="h6" component="h6" gutterBottom>
          {/* // Cambiarse a futuro por prop */}
          Examen U1 PDM
        </Typography>
        <Typography className={classes.required} variant="caption" component="h6" gutterBottom>
          * Campos obligatorios
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Asignar alumnos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Grupo</InputLabel>
                    <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Grupo">
                      {/* Poner grupos dinamicos */}
                      {/* <MenuItem value={10}>Ten</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <AsignarTransferList />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Configuración general</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <FormControl required variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Evidencia de aprendizaje</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Evidencia de aprendizaje"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FormControl required className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        disableToolbar
                        inputVariant="outlined"
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="examenFechaInicio"
                        label="Fecha de inicio"
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FormControl required className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        disableToolbar
                        inputVariant="outlined"
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="date-picker-inline2"
                        label="Fecha de cierre"
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Configuración avanzada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FormControl required variant="outlined" className={classes.formControl}>
                    <TextField id="outlined-number" label="No. de intentos" type="number" variant="outlined" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                        autoOk
                        ampm={false}
                        label="Tiempo limite por intento"
                        // value={selectedDate}
                        // onChange={handleDateChange}
                        inputVariant="outlined"
                        variant="inline"
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="filled-required" label="Contraseña" variant="outlined" />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
        <Box className={classes.center}>
          <Button variant="contained" color="primary">
            Crear asignación
          </Button>
        </Box>
      </Portada>
    );
  }
}

export default withStyles(useStyles)(Examenes);

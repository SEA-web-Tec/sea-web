import React, { Component } from "react";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, FormControl, Typography, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
import TransferList from "../../../components/Examenes/ExamenTransferList/ExamenTransferList";
import Portada from "../../../components/Portada/Portada";

class CrearExamen extends Component {

  state = {
    nombre: "",
    unidad: 1,
    id_materia: 0,
    descripcion: ""
  };

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

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
          Crear examen
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  name="nombre"
                  label="Título del examen"
                  value={this.state.nombre}
                  onChange={this.inputChangedHandler("nombre")} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Materia</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Materia">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Unidad</InputLabel>
                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Unidad">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <TextField 
                  variant="outlined"
                  margin="normal"
                  required
                  multiline
                  fullWidth
                  rows={5}
                  id="descripcion"
                  name="descripcion"
                  label="Descripción"
                  value={this.state.descripcion}
                  onChange={this.inputChangedHandler("descripcion")}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TransferList />
            </Grid>
          </Grid>
          <Box className={classes.center}>
            <Button variant="contained" color="primary">
              Crear examen
            </Button>
          </Box>
        </form>
      </Portada>
    );
  }
}

export default withStyles(useStyles)(CrearExamen);
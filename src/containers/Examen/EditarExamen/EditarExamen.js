import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
//import EditarTransferList from "components/Examenes/EditarTransferList/EditarTransferList";
import TransferList from "../../../components/Examenes/ExamenTransferList/ExamenTransferList";
import Portada from "../../../components/Portada/Portada";


class EditarExamen extends Component {
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
        <form style={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <TextField id="outlined-basic" label="Titulo del examen" variant="outlined" />
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
                <TextField id="outlined-basic" label="Descripción" variant="outlined" multiline rows={5} />
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

export default withStyles(useStyles)(EditarExamen);
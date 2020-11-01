import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
import EditarTransferList from "components/Examenes/EditarTransferList/EditarTransferList";

class EditarExamen extends Component {
  render(props) {
    const { classes } = this.props;
    return (
      <form style={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl required variant="outlined" className={classes.formControl}>
              <TextField id="tituloExamen" label="Titulo del examen" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <FormControl required variant="outlined" className={classes.formControl}>
              <InputLabel id="materiaExamen">Materia</InputLabel>
              <Select labelId="materiaExamen" id="materiaExamen" label="Materia">
                {/* Pasar por props */}
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <FormControl required variant="outlined" className={classes.formControl}>
              <InputLabel id="unidadExamen">Unidad</InputLabel>
              <Select labelId="unidadExamen" id="unidadExamen" label="Unidad">
                {/* Pasar por props */}
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl required className={classes.formControl}>
              <TextField id="descripcionExamen" label="Descripción" variant="outlined" multiline rows={5} />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <EditarTransferList />
          </Grid>
        </Grid>
        <Box className={classes.center}>
          <Button variant="contained" color="primary">
            Guardar cambios
          </Button>
        </Box>
      </form>
    );
  }
}

export default withStyles(useStyles)(EditarExamen);

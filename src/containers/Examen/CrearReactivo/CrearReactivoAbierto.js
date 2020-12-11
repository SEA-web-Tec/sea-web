import React, { Component } from "react";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";

class CrearReactivoAbierto extends Component {
    state = {
        unidad: 1,
        tipo: "abierto",
        texto_reactivo: "",
        respuesta_correcta: ""
    };

    inputChangedHandler = (prop) => (event) => {
        const updatedObject = updateObject(this.state, {
        [prop]: event.target.value
        });
        this.setState(updatedObject);
    };

    render(props) {
        const { classes } = this.props;
        let materias = ['Introducción a interfaces web','Diseño de interfaces gráficas','Creación e implementación de componenetes'];
        return (
            <Portada
            materia="Programación de Dispositivos Móviles"
            carrera="Ing. Sistemas Computacionales"
            maestro="José Tadeo Rodriguez Solano"
            grupo="F"
            periodo="Enero - Junio 2020">
            <Typography className={classes.titulo} variant="h6" component="h6">
                Reactivo Abierto
            </Typography>
            <form style={{ width: "100%" }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Categoría</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Categoría">
                                {materias.map((m) => {
                                        return (<MenuItem key={m} value={m}>{m}</MenuItem>);
                                    })}
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
                                    rows={4}
                                    id="texto_reactivo"
                                    name="texto_reactivo"
                                    label="Reactivo"
                                    value={this.state.texto_reactivo}
                                    onChange={this.inputChangedHandler("texto_reactivo")}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl required variant="outlined" className={classes.formControl}>
                                <TextField 
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    id="respuesta_correcta"
                                    name="respuesta_correcta"
                                    label="Respuesta"
                                    value={this.state.respuesta_correcta}
                                    onChange={this.inputChangedHandler("respuesta_correcta")}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box className={classes.center}>
                        <Button variant="contained" color="primary">
                            Crear reactivo
                        </Button>
                    </Box>
            </form>
            </Portada>
        );
    }
}

export default withStyles(useStyles)(CrearReactivoAbierto);
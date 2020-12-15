import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import { http } from "shared/http";

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

  submitHandler = (event) => {
    event.preventDefault();

    http
      .post(
        "/reactivos/crear",
        {
          id_materia: this.props.match.params.id,
          unidad: this.state.unidad,
          tipo: this.state.tipo,
          texto_reactivo: this.state.texto_reactivo,
          respuesta_correcta: this.state.respuesta_correcta
        },
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  render(props) {
    const { classes } = this.props;
    let unidades = [];
    for (let i = 1; i <= this.props.grupos.find((grupo) => grupo.id == this.props.match.params.id).unidades; i++) {
      unidades.push(i);
    }

    return (
      <Portada id={this.props.match.params.id}>
        <Typography className={classes.titulo} variant="h6" component="h6">
          Reactivo Abierto
        </Typography>
        <form className={classes.form} onSubmit={this.submitHandler}>
          <FormControl required fullWidth margin="normal" variant="outlined">
            <InputLabel id="unidadLabel">Unidad</InputLabel>
            <Select
              id="unidad"
              name="unidad"
              value={this.state.unidad}
              onChange={this.inputChangedHandler("unidad")}
              labelId="unidadLabel"
              label="Unidad"
            >
              {unidades.map((unidad, i) => (
                <MenuItem key={i} value={unidad}>
                  {unidad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="texto_reactivo"
            name="texto_reactivo"
            label="Pregunta"
            value={this.state.texto_reactivo}
            onChange={this.inputChangedHandler("texto_reactivo")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="respuesta_correcta"
            name="respuesta_correcta"
            label="Respuesta"
            value={this.state.respuesta_correcta}
            onChange={this.inputChangedHandler("respuesta_correcta")}
          />
          <Box className={classes.center}>
            <Button variant="contained" color="primary" type="submit">
              Crear reactivo
            </Button>
          </Box>
        </form>
      </Portada>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token, user: state.auth.user, grupos: state.grupos.grupos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchGrupos: (token, userId) => dispatch(actions.fetchGrupos(token, userId))
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(CrearReactivoAbierto));

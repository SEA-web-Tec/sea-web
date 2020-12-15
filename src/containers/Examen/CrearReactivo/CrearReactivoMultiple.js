import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import { http } from "shared/http";

class CrearReactivoMultiple extends Component {
  state = {
    unidad: 1,
    tipo: "opcion_multiple",
    texto_reactivo: "",
    respuesta_correcta: "f",
    opcion1: "",
    opcion2: "",
    opcion3: "",
    opcion4: "",
    opcion5: ""
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
          respuesta_correcta: `${this.state.opcion1 ? this.state.opcion1 + ", " : ""}${
            this.state.opcion2 ? this.state.opcion2 + ", " : ""
          }${this.state.opcion3 ? this.state.opcion3 + ", " : ""}${this.state.opcion4 ? this.state.opcion4 + ", " : ""}${
            this.state.opcion5 ? this.state.opcion5 + ", " : ""
          } # ${this.state.respuesta_correcta}`
        },
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }
      )
      .then((response) => {
        this.props.history.goBack();
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
          Reactivo de opción múltiple
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
            id="opcion1"
            name="opcion1"
            label="Opción 1"
            value={this.state.opcion1}
            onChange={this.inputChangedHandler("opcion1")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="opcion2"
            name="opcion2"
            label="Opción 2"
            value={this.state.opcion2}
            onChange={this.inputChangedHandler("opcion2")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="opcion3"
            name="opcion3"
            label="Opción 3"
            value={this.state.opcion3}
            onChange={this.inputChangedHandler("opcion3")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="opcion4"
            name="opcion4"
            label="Opción 4"
            value={this.state.opcion4}
            onChange={this.inputChangedHandler("opcion4")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="opcion5"
            name="opcion5"
            label="Opción 5"
            value={this.state.opcion5}
            onChange={this.inputChangedHandler("opcion5")}
          />
          <FormControl required fullWidth margin="normal" variant="outlined">
            <InputLabel id="respuesta_correctaLabel">Respuesta correcta</InputLabel>
            <Select
              labelId="respuesta_correctaLabel"
              id="respuesta_correcta"
              label="Respuesta correcta"
              value={this.state.respuesta_correcta}
              onChange={this.inputChangedHandler("respuesta_correcta")}
            >
              {this.state.opcion1 ? <MenuItem value={this.state.opcion1}>{this.state.opcion1}</MenuItem> : null}
              {this.state.opcion2 ? <MenuItem value={this.state.opcion2}>{this.state.opcion2}</MenuItem> : null}
              {this.state.opcion3 ? <MenuItem value={this.state.opcion3}>{this.state.opcion3}</MenuItem> : null}
              {this.state.opcion4 ? <MenuItem value={this.state.opcion4}>{this.state.opcion4}</MenuItem> : null}
              {this.state.opcion5 ? <MenuItem value={this.state.opcion5}>{this.state.opcion5}</MenuItem> : null}
            </Select>
          </FormControl>
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

export default connect(mapStateToProps)(withStyles(useStyles)(CrearReactivoMultiple));

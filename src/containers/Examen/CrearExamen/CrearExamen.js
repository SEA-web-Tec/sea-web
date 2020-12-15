import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Grid,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  List
} from "@material-ui/core";
import Portada from "../../../components/Portada/Portada";
import { http } from "shared/http";

class CrearExamen extends Component {
  state = {
    nombre: "",
    unidad: 1,
    descripcion: "",
    reactivos: []
  };

  componentDidMount() {
    this.props.onFetchReactivosSpecific(this.props.token, this.props.match.params.id, this.state.unidad);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.unidad !== this.state.unidad) {
      this.props.onFetchReactivosSpecific(this.props.token, this.props.match.params.id, this.state.unidad);
      this.setState({ reactivos: [] });
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    http
      .post(
        "/examenes/crear",
        {
          id_materia: this.props.match.params.id,
          nombre: this.state.nombre,
          unidad: this.state.unidad,
          descripcion: this.state.descripcion,
          reactivos: this.state.reactivos
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

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  reactivoToggleHandler = (value) => () => {
    const currentIndex = this.state.reactivos.indexOf(value);
    const nuevoReactivo = [...this.state.reactivos];

    if (currentIndex === -1) {
      nuevoReactivo.push(value);
    } else {
      nuevoReactivo.splice(currentIndex, 1);
    }

    this.setState({ reactivos: nuevoReactivo });
  };

  render(props) {
    const { classes } = this.props;

    let unidades = [];
    for (let i = 1; i <= this.props.grupos.find((grupo) => grupo.id == this.props.match.params.id).unidades; i++) {
      unidades.push(i);
    }

    return (
      <Portada id={this.props.match.params.id}>
        <form style={{ width: "100%" }} onSubmit={this.submitHandler}>
          <Typography variant="h6" component="h6">
            Crear examen
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre del examen"
            value={this.state.nombre}
            onChange={this.inputChangedHandler("nombre")}
          />
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
                <MenuItem key={unidad} value={unidad}>
                  {unidad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            onChange={this.inputChangedHandler("descripcion")}
          />
          <Typography component="h6" variant="h6">
            Reactivos
          </Typography>
          <List dense>
            {this.props.reactivos.map((reactivo) => {
              return (
                <ListItem key={reactivo.id}>
                  <ListItemText id={reactivo.id} primary={reactivo.texto_reactivo} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={this.reactivoToggleHandler(reactivo.id)}
                      checked={this.state.reactivos.indexOf(reactivo.id) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <Box className={classes.center}>
            <Button variant="contained" color="primary" type="submit">
              Crear examen
            </Button>
          </Box>
        </form>
      </Portada>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token, grupos: state.grupos.grupos, reactivos: state.reactivos.reactivos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReactivosSpecific: (token, materia, unidad) => dispatch(actions.fetchReactivosSpecific(token, materia, unidad))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CrearExamen));

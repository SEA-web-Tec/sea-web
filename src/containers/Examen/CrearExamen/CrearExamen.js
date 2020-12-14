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
    id_materia: 1,
    descripcion: "",
    reactivos: [],
    numUnidades: 0
  };

  componentDidMount() {
    this.props.onFetchMateriasConGrupo(this.props.token);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.unidad !== this.state.unidad) {
      this.props.onFetchReactivosSpecific(this.props.token, this.state.id_materia, this.state.unidad);
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    http
      .post(
        "/examenes/crear",
        {
          id_materia: this.state.id_materia,
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
        console.log(response);
      });
  };

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  materiaChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
    this.setState({
      numUnidades: this.props.materias.find((materia) => materia.id == event.target.value).unidades,
      reactivos: []
    });
  };

  unidadChangedHandler = (prop) => (event) => {
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
    for (let i = 1; i <= this.state.numUnidades; i++) {
      unidades.push(i);
    }

    return (
      <Portada
        materia="Programación de Dispositivos Móviles"
        carrera="Ing. Sistemas Computacionales"
        maestro="José Tadeo Rodriguez Solano"
        grupo="F"
        periodo="Enero - Junio 2020"
      >
        <form style={{ width: "100%" }} onSubmit={this.submitHandler}>
          <Typography className={classes.titulo} variant="h6" component="h6">
            Crear examen
          </Typography>
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
                  onChange={this.inputChangedHandler("nombre")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="id_materiaLabel">Materia</InputLabel>
                <Select
                  id="id_materia"
                  name="id_materia"
                  value={this.state.id_materia}
                  onChange={this.materiaChangedHandler("id_materia")}
                  labelId="id_materiaLabel"
                  label="Materia"
                >
                  {this.props.materias.map((materia) => (
                    <MenuItem key={materia.id} value={materia.id}>
                      {materia.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel id="unidadLabel">Unidad</InputLabel>
                <Select
                  id="unidad"
                  name="unidad"
                  value={this.state.unidad}
                  onChange={this.unidadChangedHandler("unidad")}
                  labelId="unidadLabel"
                  label="Unidad"
                >
                  {unidades.map((unidad) => (
                    <MenuItem key={unidad} value={unidad}>
                      {unidad}
                    </MenuItem>
                  ))}
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
                  onChange={this.inputChangedHandler("descripcion")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography component="h6" variant="h6">
                Reactivos
              </Typography>
              <List dense className={classes.formControl}>
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
            </Grid>
          </Grid>
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
  return { token: state.auth.token, materias: state.materias.materias, reactivos: state.reactivos.reactivos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMateriasConGrupo: (token) => dispatch(actions.fetchMateriasConGrupo(token)),
    onFetchReactivosSpecific: (token, materia, unidad) => dispatch(actions.fetchReactivosSpecific(token, materia, unidad))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CrearExamen));

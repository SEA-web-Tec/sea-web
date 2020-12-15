import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { http } from "shared/http";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Button,
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

class Materia extends Component {
  state = {
    nombre: "",
    abreviatura: "",
    departamento_academico: "DEPARTAMENTO DE CIENCIAS BASICAS",
    semestre: 1,
    id_temario: 0,
    unidades: 1,
    carrera: "ARQUITECTURA",
  };

  componentDidMount() {
    this.props.onFetchTemarios(this.props.token);
    this.props.onFetchMaterias(this.props.token);
    console.log(this.props.temarios);
  }

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value,
    });
    this.setState(updatedObject);
  };

  submitHandler = (event) => {
    event.preventDefault();

    http
      .post(
        "/materias/crear",
        {
          nombre: this.state.nombre,
          abreviatura: this.state.abreviatura,
          departamento_academico: this.state.departamento_academico,
          semestre: this.state.semestre,
          id_temario: this.state.id_temario,
          unidades: this.state.unidades,
          carrera: this.state.carrera,
        },
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then((response) => {
        this.props.onFetchMaterias(this.props.token);
        console.log(response);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <div className={classes.formContainer}>
          <h2>Registro de materia nueva</h2>
          <form className={classes.form} onSubmit={this.submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nombre"
              name="nombre"
              label="Nombre"
              value={this.state.nombre}
              onChange={this.inputChangedHandler("nombre")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="abreviatura"
              name="abreviatura"
              label="Abreviatura"
              value={this.state.abreviatura}
              onChange={this.inputChangedHandler("abreviatura")}
            />
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="departamento_academicoLabel">
                Departamento Académico
              </InputLabel>
              <Select
                id="departamento_academico"
                name="departamento_academico"
                value={this.state.departamento_academico}
                onChange={this.inputChangedHandler("departamento_academico")}
                labelId="departamento_academicoLabel"
                label="Departamento Académico"
              >
                <MenuItem value={"DEPARTAMENTO DE CIENCIAS BASICAS"}>
                  Departamento de Ciencias Básicas
                </MenuItem>
                <MenuItem
                  value={"DEPARTAMENTO DE CIENCIAS ECONOMICO ADMINISTRATIVAS"}
                >
                  Departamento de Ciencias Económico Administrativas
                </MenuItem>
                <MenuItem value={"DEPARTAMENTO DE CIENCIAS DE LA TIERRA"}>
                  Departamento de Ciencias de la Tierra
                </MenuItem>
                <MenuItem value={"DEPARTAMENTO DE INGENIERIAS"}>
                  Departamento de Ingenierías
                </MenuItem>
                <MenuItem value={"DEPARTAMENTO DE METAL-MECANICA"}>
                  Departamento de Metal-Mecánica
                </MenuItem>
                <MenuItem value={"DEPARTAMENTO DE SISTEMAS Y COMPUTACION"}>
                  Departamento de Sistemas y Computación
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="semestreLabel">Semestre</InputLabel>
              <Select
                id="semestre"
                name="semestre"
                value={this.state.semestre}
                onChange={this.inputChangedHandler("semestre")}
                labelId="semestreLabel"
                label="Semestre"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="id_temarioLabel">Temario</InputLabel>
              <Select
                id="id_temario"
                name="id_temario"
                value={this.state.id_temario}
                onChange={this.inputChangedHandler("id_temario")}
                labelId="id_temarioLabel"
                label="Temario"
              >
                {this.props.temarios.map((temario) => (
                  <MenuItem key={temario.id} value={temario.id}>
                    {temario.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="carreraLabel">Carrera</InputLabel>
              <Select
                id="carrera"
                name="carrera"
                value={this.state.carrera}
                onChange={this.inputChangedHandler("carrera")}
                labelId="carreraLabel"
                label="Carrera"
              >
                <MenuItem value={"ARQUITECTURA"}>Arquitectura</MenuItem>
                <MenuItem value={"INGENIERÍA EN GESTIÓN EMPRESARIAL"}>
                  Ingeniería en Gestión Empresarial
                </MenuItem>
                <MenuItem value={"INGENIERÍA BIOQUÍMICA"}>
                  Ingeniería Bioquímica
                </MenuItem>
                <MenuItem value={"INGENIERÍA CIVIL"}>Ingeniería Civil</MenuItem>
                <MenuItem value={"INGENIERÍA ELECTROMECÁNICA"}>
                  Ingeniería Electromecánica
                </MenuItem>
                <MenuItem value={"INGENIERÍA EN SISTEMAS COMPUTACIONALES"}>
                  Ingeniería en Sistemas Computacionales
                </MenuItem>
                <MenuItem value={"INGENIERÍA INDUSTRIAL"}>
                  Ingeniería Industrial
                </MenuItem>
                <MenuItem value={"LICENCIATURA EN ADMINISTRACIÓN"}>
                  Licenciatura en Administración
                </MenuItem>
                <MenuItem value={"CONTADOR PÚBLICO"}>Contador Público</MenuItem>
              </Select>
            </FormControl>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              marginTop={1}
            ></Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="large"
            >
              Crear materia
            </Button>
          </form>
          <Divider
            style={{ width: "100%", margin: "16px 0" }}
            variant="middle"
          />
          <Box width="100%">
            <h2 style={{ textAlign: "center" }}>Materias</h2>
            <List>
              {this.props.materias.map((materia) => (
                <ListItem key={materia.id}>
                  <ListItemText
                    primary={materia.nombre}
                    secondary={materia.carrera}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    temarios: state.temarios.temarios,
    materias: state.materias.materias,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTemarios: (token) => dispatch(actions.fetchTemarios(token)),
    onFetchMaterias: (token) => dispatch(actions.fetchMaterias(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Materia));

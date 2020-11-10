import React, { Component } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  FormControl,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { EditOutlined, Visibility, VisibilityOff } from "@material-ui/icons/";

class Registro extends Component {
  state = {
    numEconomico: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rfc: "",
    curp: "",
    correo: "",
    cedulaProfesional: "",
    departamentoAcademico: "",
    sexo: "MASCULINO",
    estudios: "PENDIENTE",
    userType: 2,
    contrasenia: "",
    showPassword: false
  };

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.correo, this.state.contrasenia);
  };

  showPasswordHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  render() {
    const { classes } = this.props;

    let form = (
      <form className={classes.form} noValidate onSubmit={this.submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="numEconomico"
          name="numEconomico"
          label="Número Económico"
          value={this.state.numEconomico}
          onChange={this.inputChangedHandler("numEconomico")}
          type="number"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nombre"
          name="nombre"
          label="Nombre(s)"
          value={this.state.nombre}
          onChange={this.inputChangedHandler("nombre")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="apellidoPaterno"
          name="apellidoPaterno"
          label="Apellido Paterno"
          value={this.state.apellidoPaterno}
          onChange={this.inputChangedHandler("apellidoPaterno")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="apellidoMaterno"
          name="apellidoMaterno"
          label="Apellido Materno"
          value={this.state.apellidoMaterno}
          onChange={this.inputChangedHandler("apellidoMaterno")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="rfc"
          name="rfc"
          label="RFC"
          value={this.state.rfc}
          onChange={this.inputChangedHandler("rfc")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="curp"
          name="curp"
          label="CURP"
          value={this.state.curp}
          onChange={this.inputChangedHandler("curp")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="correo"
          name="correo"
          label="Correo Electrónico"
          value={this.state.correo}
          onChange={this.inputChangedHandler("correo")}
          type="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cedulaProfesional"
          name="cedulaProfesional"
          label="Cédula Profesional"
          value={this.state.cedulaProfesional}
          onChange={this.inputChangedHandler("cedulaProfesional")}
          type="number"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="departamentoAcademico"
          name="departamentoAcademico"
          label="Departamento Académico"
          value={this.state.departamentoAcademico}
          onChange={this.inputChangedHandler("departamentoAcademico")}
        />
        <FormControl required fullWidth margin="normal" variant="outlined">
          <InputLabel id="sexoLabel">Sexo</InputLabel>
          <Select
            id="sexo"
            name="sexo"
            value={this.state.sexo}
            onChange={this.inputChangedHandler("sexo")}
            labelId="sexoLabel"
            label="Sexo"
          >
            <MenuItem value={"MASCULINO"}>Masculino</MenuItem>
            <MenuItem value={"FEMENINO"}>Femenino</MenuItem>
          </Select>
        </FormControl>
        <FormControl required fullWidth margin="normal" variant="outlined">
          <InputLabel id="estudiosLabel">Estudios</InputLabel>
          <Select
            id="estudios"
            name="estudios"
            value={this.state.estudios}
            onChange={this.inputChangedHandler("estudios")}
            labelId="estudiosLabel"
            label="Estudios"
          >
            <MenuItem value={"PENDIENTE"}>Pendiente</MenuItem>
            <MenuItem value={"PRIMARIA"}>Primaria</MenuItem>
            <MenuItem value={"SECUNDARIA"}>Secundaria</MenuItem>
            <MenuItem value={"BACHILLERATO"}>Bachillerato</MenuItem>
            <MenuItem value={"TECNICO"}>Técnico</MenuItem>
            <MenuItem value={"PASANTE"}>Pasante</MenuItem>
            <MenuItem value={"LICENCIATURA"}>Licenciatura</MenuItem>
            <MenuItem value={"ESPECIALIDAD"}>Especialidad</MenuItem>
            <MenuItem value={"MAESTRIA"}>Maestria</MenuItem>
            <MenuItem value={"DOCTORADO"}>Doctorado</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="contrasenia"
          name="contrasenia"
          label="Contraseña"
          value={this.state.contrasenia}
          onChange={this.inputChangedHandler("contrasenia")}
          type={this.state.showPassword ? "text" : "password"}
          error={this.props.error !== null}
          helperText={this.props.error !== null && this.props.error.code === 400 ? "Contraseña Inválida" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.showPasswordHandler}>
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} size="large">
          Crear cuenta
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <CircularProgress className={classes.spinner} />;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/grupos" />;
    }

    return (
      <Container maxWidth="xs">
        {authRedirect}
        <div className={classes.formContainer}>
          <Avatar className={classes.logo}>
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de cuenta nueva
          </Typography>
          {form}
          <Link color="textSecondary" variant="subtitle2" component={RouterLink} to="/">
            Regresar al login
          </Link>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Registro));

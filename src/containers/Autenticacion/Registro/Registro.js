import React, { Component } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import ReCAPTCHA from "react-google-recaptcha";
import { http } from "shared/http";
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
  InputAdornment,
  Snackbar,
  Box
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { EditOutlined, Visibility, VisibilityOff } from "@material-ui/icons/";

class Registro extends Component {
  state = {
    numeroEconomico: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rfc: "",
    curp: "",
    correo: "",
    cedulaProfesional: "",
    departamentoAcademico: "DEPARTAMENTO DE CIENCIAS BASICAS",
    sexo: "MASCULINO",
    estudios: "PENDIENTE",
    userType: 2,
    contrasenia: "",
    repetirContrasenia: "",
    showPassword: false,
    captchaDone: false,
    error: false,
    errorMessage: "",
    errorStatus: 0
  };

  inputChangedHandler = (prop) => (event) => {
    let value = event.target.value;
    if (prop == "rfc" || prop == "curp") {
      value = value.toUpperCase();
    }
    const updatedObject = updateObject(this.state, {
      [prop]: value
    });
    this.setState(updatedObject);
  };

  captchaHandler = (value) => {
    if (value) {
      this.setState({ captchaDone: true });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.captchaDone) {
      http
        .post("/auth/registrar", {
          numeroEconomico: this.state.numeroEconomico,
          nombre: this.state.nombre,
          apellidoPaterno: this.state.apellidoPaterno,
          apellidoMaterno: this.state.apellidoMaterno,
          rfc: this.state.rfc,
          curp: this.state.curp,
          correo: this.state.correo.toLowerCase(),
          cedulaProfesional: this.state.cedulaProfesional,
          fotoPerfil: null,
          fotoPortada: null,
          departamentoAcademico: this.state.departamentoAcademico,
          sexo: this.state.sexo,
          estudios: this.state.estudios,
          contrasenia: this.state.contrasenia
        })
        .then((response) => {
          this.setState({ error: true, errorMessage: response.data.message, errorStatus: response.status });
          setTimeout(() => {
            this.props.history.push("/");
          }, 2000);
        })
        .catch((error) => {
          if (error.response == undefined) {
            this.setState({
              error: true,
              errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
              errorStatus: 500
            });
          } else {
            this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status });
          }
        });
    } else {
      this.setState({ error: true });
    }
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
      <form className={classes.form} onSubmit={this.submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="numeroEconomico"
          name="numeroEconomico"
          label="Número Económico"
          value={this.state.numeroEconomico}
          onChange={this.inputChangedHandler("numeroEconomico")}
          type="number"
          error={!this.state.numeroEconomico.match(/^\d{11}$/) && this.state.numeroEconomico.length > 0}
          helperText={
            !this.state.numeroEconomico.match(/^\d{11}$/) &&
            this.state.numeroEconomico.length > 0 &&
            "El número económico  es incorrecto."
          }
          inputProps={{
            min: 0
          }}
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
          error={
            !this.state.nombre.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s{1}([a-zA-ZÀ-ÿ\u00f1\u00d1])+)*))$/) &&
            this.state.nombre.length > 0
          }
          helperText={
            !this.state.nombre.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s{1}([a-zA-ZÀ-ÿ\u00f1\u00d1])+)*))$/) &&
            this.state.nombre.length > 0 &&
            "El nombre  es incorrecto."
          }
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
          error={!this.state.apellidoPaterno.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]))+$/) && this.state.apellidoPaterno.length > 0}
          helperText={
            !this.state.apellidoPaterno.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]))+$/) &&
            this.state.apellidoPaterno.length > 0 &&
            "El apellido paterno es incorrecto."
          }
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
          error={!this.state.apellidoMaterno.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]))+$/) && this.state.apellidoMaterno.length > 0}
          helperText={
            !this.state.apellidoMaterno.match(/^(([a-zA-ZÀ-ÿ\u00f1\u00d1]))+$/) &&
            this.state.apellidoMaterno.length > 0 &&
            "El apellido materno es incorrecto."
          }
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
          error={
            !this.state.rfc.match(
              /^([A-Z|a-z|&amp;]{3}\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)|([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$|^([A-Z|a-z]{4}\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)|([02468][048]|[13579][26])0229)((\w{2})([A|a|0-9]{1})){0,3}$/
            ) && this.state.rfc.length > 0
          }
          helperText={
            !this.state.rfc.match(
              /^([A-Z|a-z|&amp;]{3}\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)|([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$|^([A-Z|a-z]{4}\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)|([02468][048]|[13579][26])0229)((\w{2})([A|a|0-9]{1})){0,3}$/
            ) &&
            this.state.rfc.length > 0 &&
            "El RFC es incorrecto."
          }
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
          error={
            !this.state.curp
              .toUpperCase()
              .match(
                /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
              ) && this.state.curp.length > 0
          }
          helperText={
            !this.state.curp
              .toUpperCase()
              .match(
                /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
              ) &&
            this.state.curp.length > 0 &&
            "El CURP es incorrecto."
          }
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
          error={!this.state.cedulaProfesional.match(/^\d{7,8}$/) && this.state.cedulaProfesional.length > 0}
          helperText={
            !this.state.cedulaProfesional.match(/^\d{7,8}$/) &&
            this.state.cedulaProfesional.length > 0 &&
            "La cédula profesional es incorrecto."
          }
        />
        <FormControl required fullWidth margin="normal" variant="outlined">
          <InputLabel id="departamentoAcademicoLabel">Departamento Académico</InputLabel>
          <Select
            id="departamentoAcademico"
            name="departamentoAcademico"
            value={this.state.departamentoAcademico}
            onChange={this.inputChangedHandler("departamentoAcademico")}
            labelId="departamentoAcademicoLabel"
            label="Departamento Académico"
          >
            <MenuItem value={"DEPARTAMENTO DE CIENCIAS BASICAS"}>Departamento de Ciencias Básicas</MenuItem>
            <MenuItem value={"DEPARTAMENTO DE CIENCIAS ECONOMICO ADMINISTRATIVAS"}>
              Departamento de Ciencias Económico Administrativas
            </MenuItem>
            <MenuItem value={"DEPARTAMENTO DE CIENCIAS DE LA TIERRA"}>Departamento de Ciencias de la Tierra</MenuItem>
            <MenuItem value={"DEPARTAMENTO DE INGENIERIAS"}>Departamento de Ingenierías</MenuItem>
            <MenuItem value={"DEPARTAMENTO DE METAL-MECANICA"}>Departamento de Metal-Mecánica</MenuItem>
            <MenuItem value={"DEPARTAMENTO DE SISTEMAS Y COMPUTACION"}>Departamento de Sistemas y Computación</MenuItem>
          </Select>
        </FormControl>
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
            <MenuItem value={"MAESTRIA"}>Maestría</MenuItem>
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
          error={this.state.contrasenia !== this.state.repetirContrasenia}
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="repetirContrasenia"
          name="repetirContrasenia"
          label="Repetir Contraseña"
          value={this.state.repetirContrasenia}
          onChange={this.inputChangedHandler("repetirContrasenia")}
          type={this.state.showPassword ? "text" : "password"}
          error={this.state.contrasenia !== this.state.repetirContrasenia}
          helperText={this.state.contrasenia !== this.state.repetirContrasenia && "Las contraseñas no coinciden"}
        />
        <Box display="flex" justifyContent="center" width="100%" marginTop={1}>
          <ReCAPTCHA
            sitekey="6LfPFbwUAAAAAMsWQOIRm8KuF4dGIZRs6vHN_2c6"
            onChange={this.captchaHandler}
            onExpired={() => {
              this.setState({ captchaDone: false, errorMessage: "" });
            }}
          />
        </Box>
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

    let error = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.state.error}
        onClose={() => {
          this.setState({ error: false });
        }}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity={this.state.errorStatus == 201 ? "success" : "warning"}>
          {this.state.errorMessage !== "" ? this.state.errorMessage : "Favor de realizar el CAPTCHA antes de registrarte!"}
        </Alert>
      </Snackbar>
    );

    return (
      <Container maxWidth="xs">
        {error}
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

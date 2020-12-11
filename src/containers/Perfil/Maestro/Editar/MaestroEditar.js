import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { getBase64, updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import {
  AddCircleTwoTone as AddCircleTwoToneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@material-ui/icons";
import PerfilPortada from "components/Perfil/PerfilPortada/PerfilPortada";
import { Alert } from "@material-ui/lab";
import { http } from "shared/http";
import { Redirect } from "react-router-dom";

class MaestroEditar extends Component {
  state = {
    fotoPerfil: "",
    fotoPortada: "",
    correo: "",
    contrasenia: "",
    repetirContrasenia: "",
    error: false,
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
    if (this.state.contrasenia === this.state.repetirContrasenia) {
      // TODO: Hacer esta wea en redux
      // this.props.onAuth(this.state.correo, this.state.contrasenia);

      http
        .patch(`/usuarios/${this.props.user.id}/editar`, {
          fotoPerfil: this.state.fotoPerfil,
          fotoPortada: this.state.fotoPortada,
          correo: this.state.correo,
          contrasenia: this.state.contrasenia
        })
        .then((response) => {
          this.props.history.push(`/usuario/${this.props.user.id}`);
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

  handleFileSelected = (event, prop) => {
    if (event.target.files.length > 0) {
      getBase64(event.target.files[0]).then((data) => {
        this.setState({ [prop]: data.toString() });
      });
    }
  };

  render(props) {
    const { classes } = this.props;

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
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="error">
          Favor de llenar los campos de manera correcta
        </Alert>
      </Snackbar>
    );

    let authRedirect = null;
    if (this.props.user.id != this.props.match.params.id) {
      authRedirect = <Redirect to={"/404"} />;
    }

    let perfil = <CircularProgress className={classes.spinner} />;

    if (!this.props.loading) {
      perfil = (
        <PerfilPortada
          fotoPerfil={this.props.user.fotoPerfil}
          fotoPortada={this.props.user.fotoPortada}
          departamentoAcademico={this.props.user.departamentoAcademico}
          nombres={this.props.user.nombres}
          apellidoPaterno={this.props.user.apellidoPaterno}
          apellidoMaterno={this.props.user.apellidoMaterno}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xd={12} sm={12} md={6} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography component="h6" variant="h6" align="center" gutterBottom>
                  Foto de perfil
                </Typography>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  badgeContent={
                    <Fragment>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="fotoPerfil"
                        type="file"
                        onChange={(e) => this.handleFileSelected(e, "fotoPerfil")}
                      />
                      <label htmlFor="fotoPerfil">
                        <IconButton color="secondary" size="small" className={classes.badgeIcon} component="span">
                          <AddCircleTwoToneIcon fontSize="large" />
                        </IconButton>
                      </label>
                    </Fragment>
                  }
                  className={classes.center}
                >
                  <Avatar
                    src={this.state.fotoPerfil ? this.state.fotoPerfil : this.props.user.fotoPerfil}
                    alt="Foto de perfil"
                    style={{ width: "200px", height: "200px" }}
                  />
                </Badge>
              </Grid>
              <Grid item xd={12} sm={12} md={6} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography component="h6" variant="h6" align="center" gutterBottom>
                  Foto de portada
                </Typography>
                <Badge
                  overlap="rectangle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  badgeContent={
                    <Fragment>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="fotoPortada"
                        type="file"
                        onChange={(e) => this.handleFileSelected(e, "fotoPortada")}
                      />
                      <label htmlFor="fotoPortada">
                        <IconButton color="secondary" size="small" className={classes.badgeIcon} component="span">
                          <AddCircleTwoToneIcon fontSize="large" />
                        </IconButton>
                      </label>
                    </Fragment>
                  }
                  className={classes.center}
                >
                  <Avatar
                    src={this.state.fotoPortada ? this.state.fotoPortada : this.props.user.fotoPortada}
                    alt="Foto de portada"
                    style={{ width: "300px", height: "100px", objectFit: "cover" }}
                    variant="rounded"
                  />
                </Badge>
              </Grid>
              <Grid item xd={12} sm={12} md={12}>
                <Typography component="h6" variant="h6" align="center">
                  Datos generales
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
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
                          {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="repetirContrasenia"
                  name="repetirContrasenia"
                  label="Repetir Contraseña"
                  value={this.state.repetirContrasenia}
                  onChange={this.inputChangedHandler("repetirContrasenia")}
                  type={this.state.showPassword ? "text" : "password"}
                  error={this.state.contrasenia !== this.state.repetirContrasenia}
                  helperText={this.state.contrasenia !== this.state.repetirContrasenia && "Las contraseña no coinciden"}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" padding={2}>
              <Button variant="contained" color="secondary" size="large" type="submit" onClick={this.submitHandler}>
                Guardar Cambios
              </Button>
            </Box>
          </form>
        </PerfilPortada>
      );
    }
    return (
      <Fragment>
        {authRedirect}
        {error}
        {perfil}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    error: state.auth.error,
    hasError: state.auth.hasError,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPerfil: (token, userId) => dispatch(actions.fetchPerfil(token, userId)),
    onPerfilDismissError: () => dispatch(actions.perfilDismissError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MaestroEditar));

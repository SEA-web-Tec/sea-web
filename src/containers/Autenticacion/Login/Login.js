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
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { EditOutlined, Visibility, VisibilityOff } from "@material-ui/icons/";

class Login extends Component {
  state = {
    correo: "",
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
          Iniciar Sesión
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
            Bienvenido a SEA
          </Typography>
          {form}
          <Link color="textSecondary" variant="subtitle2" component={RouterLink} to="/registro">
            No tienes una cuenta? da click aquí!
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Login));

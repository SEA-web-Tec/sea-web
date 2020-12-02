import React, { Component } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import ReCAPTCHA from "react-google-recaptcha";
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
  CircularProgress,
  Box,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { EditOutlined, Visibility, VisibilityOff } from "@material-ui/icons/";

class Login extends Component {
  state = {
    correo: "",
    contrasenia: "",
    showPassword: false,
    captchaDone: false,
    error: false
  };

  inputChangedHandler = (prop) => (event) => {
    var updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  captchaHandler = (value) => {
    if (value) {
      this.setState({ captchaDone: true });
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();
    if (this.state.captchaDone) {
      const allDone = await this.props.onAuth(this.state.correo, this.state.contrasenia);
      if (allDone) {
        this.props.history.push("/grupos");
      }
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
          id="correo"
          name="correo"
          label="Correo Electrónico"
          value={this.state.correo}
          onChange={this.inputChangedHandler("correo")}
          type="email"
          error={this.props.error !== null}
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
          Iniciar Sesión
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <CircularProgress className={classes.spinner} />;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={"/grupos"} />;
    }

    let error = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.state.error || this.props.hasError}
        onClose={() => {
          this.setState({ error: false });
          this.props.onAuthDismissError();
        }}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="error">
          {this.props.error || "Favor de realizar el CAPTCHA antes de iniciar sesión!"}
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
          <Typography variant="h5">Bienvenido a SEA</Typography>
          {form}
          <Typography color="textSecondary" component="span" variant="subtitle2">
            ¿Aún no te has registrado?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/registro">
              Registrarse
            </Link>
          </Typography>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    hasError: state.auth.hasError,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (correo, contrasenia) => dispatch(actions.auth(correo, contrasenia)),
    onAuthDismissError: () => dispatch(actions.authDismissError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Login));

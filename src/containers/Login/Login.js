import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { updateObject } from "../../shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Avatar,
  Button,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
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
    control: "",
    password: "",
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
    this.props.onAuth(this.state.control, this.state.password);
  };

  switchShowPasswordHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  render() {
    const { classes } = this.props;

    let form = (
      <Fragment>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="control"
          name="control"
          label="No. Control"
          value={this.state.control}
          onChange={this.inputChangedHandler("control")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          value={this.state.password}
          type={this.state.showPassword ? "text" : "password"}
          error={this.props.error !== null}
          helperText={this.props.error !== null && this.props.error.code === 400 ? "Contraseña Inválida" : ""}
          onChange={this.inputChangedHandler("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.switchShowPasswordHandler}>
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recuérdame" />
      </Fragment>
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
        <Box className={classes.formContainer}>
          <Avatar className={classes.logo}>
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bienvenido
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitHandler}>
            {form}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} size="large">
              Iniciar Sesión
            </Button>
            <Typography align="center">
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Typography>
          </form>
          {/* <ButtonGroup
                        color="primary"
                        fullWidth
                        style={{ marginTop: "64px" }}
                        size="large"
                    >
                        <Button component={RouterLink} to="/grupos">
                            Maestro
                        </Button>
                        <Button>Alumno</Button>
                    </ButtonGroup> */}
        </Box>
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

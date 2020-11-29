import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Button, Typography, Box, Container } from "@material-ui/core";

class NotFound extends Component {
  returnClickHandler = (event) => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="sm">
        <Box className={classes.container}>
          <Typography component="h2" variant="h5" style={{ fontWeight: "bold", marginBottom: "30px" }}>
            {this.props.isAuthenticated ? "404 - NO SE ENCONTRÓ ESTA PÁGINA" : "403 - ACCESO DENEGADO"}
          </Typography>
          <Typography component="p" variant="body1">
            {this.props.isAuthenticated
              ? "No se encontró esta página, pero quizá esté disponible más adelante."
              : "No tienes acceso a esta página, ya intentaste iniciando sesión?"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "16px" }}
            onClick={this.returnClickHandler}
          >
            {this.props.isAuthenticated ? "Regresar al inicio" : "Iniciar sesión"}
          </Button>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(NotFound));

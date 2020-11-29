import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, CircularProgress, Snackbar, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Grupo from "components/Grupo/Grupo";

class Grupos extends Component {
  componentDidMount() {
    this.props.onFetchGrupos(this.props.token, this.props.userId);
  }

  render() {
    const { classes } = this.props;

    let grupos = <CircularProgress className={classes.spinner} />;

    if (!this.props.loading) {
      grupos = this.props.grupos.map((grupo) => {
        return (
          <Grupo
            key={grupo.id}
            materia={grupo.materia}
            carrera={grupo.carrera}
            maestro={grupo.maestro}
            portada={grupo.portada}
            fotoPerfil={grupo.fotoPerfil}
          />
        );
      });
    }

    let error = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.props.hasError}
        onClose={() => this.props.onGruposDismissError()}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="error">
          {this.props.error ? this.props.error : "Ha ocurrido un error, favor de intentarlo más tarde"}
        </Alert>
      </Snackbar>
    );

    return (
      <Grid container spacing={4}>
        {error}
        {grupos}
        <Button component={RouterLink} to={`/usuario/${this.props.userId}`}>
          Perfil del maestro: {this.props.userId}
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grupos: state.grupos.grupos,
    error: state.grupos.error,
    hasError: state.grupos.hasError,
    loading: state.grupos.loading,
    token: state.auth.token,
    userId: state.auth.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchGrupos: (token, userId) => dispatch(actions.fetchGrupos(token, userId)),
    onGruposDismissError: () => dispatch(actions.gruposDismissError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Grupos));

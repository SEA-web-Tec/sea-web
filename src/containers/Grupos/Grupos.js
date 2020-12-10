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
    this.props.onFetchGrupos(this.props.token, this.props.user.id);
  }

  render() {
    const { classes } = this.props;

    let grupos = <CircularProgress className={classes.spinner} />;

    if (!this.props.loading) {
      grupos = this.props.grupos.map((grupo) => {
        return (
          <Grupo
            key={grupo.id}
            id={grupo.id}
            materia={grupo.nombre}
            carrera={grupo.carrera}
            maestro={`${this.props.user.nombres} ${this.props.user.apellidoPaterno} ${this.props.user.apellidoMaterno}`}
            portada={"https://picsum.photos/300/150"}
            fotoPerfil={this.props.user.fotoPerfil}
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
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchGrupos: (token, userId) => dispatch(actions.fetchGrupos(token, userId)),
    onGruposDismissError: () => dispatch(actions.gruposDismissError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Grupos));

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, CircularProgress, Snackbar, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Grupo from "components/Grupo/Grupo";
import SadIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import SideItem from "components/SideItem/SideItem";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { Typography } from "@material-ui/core";

class Grupos extends Component {
    componentDidMount() {
        this.props.onFetchGrupos(this.props.token, this.props.user.id);
    }

    render() {
        const { classes } = this.props;

        const esAdmin = this.props.user.userType == 1;

        let grupos = <CircularProgress className={classes.spinner} />;

        if (!this.props.loading) {
            grupos =
                this.props.grupos.length > 0 ? (
                    this.props.grupos.map((grupo) => {
                        return (
                            <Grupo
                                key={grupo.id}
                                id={grupo.id}
                                materia={grupo.nombre}
                                carrera={grupo.carrera}
                                maestro={`${this.props.user.nombres} ${this.props.user.apellidoPaterno} ${this.props.user.apellidoMaterno}`}
                                portada={grupo.fotoPortada}
                                fotoPerfil={this.props.user.fotoPerfil}
                            />
                        );
                    })
                ) : (
                    <Typography>Sin grupos asignados</Typography>
                );
        }

        let error = (
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={this.props.hasError}
                onClose={() => this.props.onGruposDismissError()}
                autoHideDuration={4000}
            >
                <Alert variant="filled" severity="error">
                    {this.props.error
                        ? this.props.error
                        : "Ha ocurrido un error, favor de intentarlo más tarde"}
                </Alert>
            </Snackbar>
        );

        return (
            <Grid container spacing={4}>
                {error}
                {grupos}
                {esAdmin ? (
                    <Link
                        to={{
                            pathname: "/admin/grupos",
                        }}
                    >
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            className={classes.speedDial}
                            icon={<SpeedDialIcon />}
                        ></SpeedDial>
                    </Link>
                ) : null}
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
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchGrupos: (token, userId) =>
            dispatch(actions.fetchGrupos(token, userId)),
        onGruposDismissError: () => dispatch(actions.gruposDismissError()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(Grupos));

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import Curso from "../../components/Curso/Curso";

class Grupos extends Component {
    componentDidMount() {
        this.props.onFetchCursos(this.props.token, this.props.userId);
    }

    render() {
        const { classes } = this.props;

        let cursos = <CircularProgress />;
        if (!this.props.loading) {
            cursos = this.props.cursos.map((curso) => {
                return (
                    <Curso
                        key={curso.id}
                        materia={curso.materia}
                        carrera={curso.carrera}
                        maestro={curso.maestro}
                        portada={curso.portada}
                        fotoPerfil={curso.fotoPerfil}
                        horario={curso.horario}
                    />
                );
            });
        }

        return (
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    {cursos}
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cursos: state.curso.cursos,
        loading: state.curso.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCursos: (token, userId) =>
            dispatch(actions.fetchCursos(token, userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(Grupos));

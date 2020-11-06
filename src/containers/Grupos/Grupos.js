import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import Grupo from "components/Grupo/Grupo";

class Grupos extends Component {
    componentDidMount() {
        this.props.onFetchCursos(this.props.token, this.props.userId);
    }

    render() {
        // const { classes } = this.props;

        let cursos = <CircularProgress />;
        if (!this.props.loading) {
            cursos = this.props.cursos.map((curso) => {
                return (
                    <Grupo
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
            <Grid container spacing={4}>
                {cursos}
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Grupos);

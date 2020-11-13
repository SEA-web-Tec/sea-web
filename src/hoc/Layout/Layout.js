import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BarraSuperior from "components/Layout/BarraSuperior/BarraSuperior";
import BarraIzquierda from "components/Layout/BarraIzquierda/BarraIzquierda";
import BarraUtilidades from "components/Layout/BarraUtilidades/BarraUtilidades";
import Contenido from "components/Layout/Contenido/Contenido";

class Layout extends Component {
    state = {
        open: false,
    };

    sideDrawerCloseHandler = () => {
        this.setState({ open: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { open: !prevState.open };
        });
    };

    render() {
        return (
            <Fragment >
                {this.props.isAuthenticated ? (
                    <Fragment>
                        <BarraSuperior
                            toggleDrawer={this.sideDrawerToggleHandler}
                            titulo="Inicio"
                        ></BarraSuperior>
                        <BarraIzquierda
                            open={this.state.open}
                            closed={this.sideDrawerCloseHandler}
                        ></BarraIzquierda>
                        <BarraUtilidades></BarraUtilidades>
                    </Fragment>
                ) : null}
                <Contenido>{this.props.children}</Contenido>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);

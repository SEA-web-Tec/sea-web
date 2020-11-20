import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { CssBaseline } from "@material-ui/core";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import Login from "./containers/Autenticacion/Login/Login";
import Registro from "./containers/Autenticacion/Registro/Registro";
import Logout from "./containers/Autenticacion/Login/Logout/Logout";
import Grupos from "./containers/Grupos/Grupos";
import AppTheme from "./AppTheme";

const asyncID = asyncComponent(() => {
    return import("./containers/ID/ID");
});

const asyncMenuInstrumentos = asyncComponent(() => {
    return import("./containers/MenuInstrumentos/MenuInstrumentos");
});

const asyncRubrica = asyncComponent(() => {
    return import("./containers/Rubrica/Rubrica");
});

const asyncDashboardExamen = asyncComponent(() => {
    return import("./containers/Examen/DashboardExamen/DashboardExamen");
});

const asyncCrearExamen = asyncComponent(() => {
    return import("./containers/Examen/CrearExamen/CrearExamen");
});

const asyncEditarExamen = asyncComponent(() => {
    return import("./containers/Examen/EditarExamen/EditarExamen");
});

const asyncAsignarExamen = asyncComponent(() => {
    return import("./containers/Examen/AsignarExamen/AsignarExamen");
});

const asyncContenedorExamen = asyncComponent(() => {
    return import("./containers/Examen/ContenedorExamen/ContenedorExamen");
});

const asyncNotFound = asyncComponent(() => {
    return import("./containers/NotFound/NotFound");
});

const asyncListaCotejo = asyncComponent(() => {
  return import("./containers/ListaCotejo/ListaCotejo");
});
const asyncListaObservacion = asyncComponent(() => {
  return import("./containers/ListaObservacion/ListaObservacion");
});

const asyncExposiciones = asyncComponent(() => {
    return import("./components/TrabajoIndividual/TrabajoIndividual");
});

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheck();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" component={Login} />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/grupos" exact component={Grupos} />
                    <Route path="/instrumentacion" exact component={asyncID} />
                    <Route
                        path="/instrumentos"
                        exact
                        component={asyncMenuInstrumentos}
                    />
                    <Route path="/rubrica" exact component={asyncRubrica} />
                    <Route path="/listaobservacion" component={asyncListaObservacion} />
                    <Route path="/listacotejo" component={asyncListaCotejo} />
                    <Route
                        path="/examen/"
                        exact
                        component={asyncDashboardExamen}
                    />
                    <Route path="/examen/crear" component={asyncCrearExamen} />
                    <Route
                        path="/examen/editar"
                        component={asyncEditarExamen}
                    />
                    <Route
                        path="/examen/asignar"
                        component={asyncAsignarExamen}
                    />
                    <Route
                        path="/examen/id"
                        component={asyncContenedorExamen}
                    />
                    <Route path="/trabajo-individual" component={asyncExposiciones} />
                    <Route component={asyncNotFound} />
                </Switch>
            );
        }

        return (
            <AppTheme>
                <CssBaseline />
                <Layout>{routes}</Layout>
            </AppTheme>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheck: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

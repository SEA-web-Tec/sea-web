import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { CssBaseline } from "@material-ui/core";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import Login from "./containers/Autenticacion/Login/Login";
import Registro from "./containers/Autenticacion/Registro/Registro";
import Logout from "./containers/Autenticacion/Logout/Logout";
import Grupos from "./containers/Grupos/Grupos";
import AppTheme from "./AppTheme"
// reactivos
import CrearReactivoAbierto from "./containers/Examen/CrearReactivo/CrearReactivoAbierto.js";
import CrearReactivoFV from "./containers/Examen/CrearReactivo/CrearReactivoFV.js";
import CrearReactivoMultiple from "./containers/Examen/CrearReactivo/CrearReactivoMultiple.js";
import BancoReactivos from "./containers/Examen/BancoReactivos/BancoReactivos.js";
import Resultados from "./containers/Examen/ResultadosExamen/Resultados.js";
import Respuestas from "./containers/Examen/ResultadosExamen/Respuestas.js";
import MaestroGeneral from "containers/Perfil/Maestro/General/MaestroGeneral";
import MaestroEditar from "containers/Perfil/Maestro/Editar/MaestroEditar";
import AppTheme from "./AppTheme";

const asyncID = asyncComponent(() => {
  return import("./containers/ID/ID");
});

const asyncIDEditar = asyncComponent(() => {
  return import("./containers/ID/IDeditar");
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

const asyncAdmin = asyncComponent(() => {
  return import("./containers/Admin/Admin");
});

const asyncAdminMateria = asyncComponent(() => {
  return import("./containers/Admin/Materia/Materia");
});

const asyncAdminGrupo = asyncComponent(() => {
  return import("./containers/Admin/Grupo/Grupo");
});

class App extends Component {
  state = {
    allDone: false
  };
  componentDidMount() {
    this.props.onAuthCheck();
    this.setState({ allDone: true });
  }

  render() {
    let routes = (
      <Switch>
        {/* AUTH */}
        <Route path="/" exact component={Login} />
        <Route path="/registro" exact component={Registro} />
        <Route component={asyncNotFound} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* AUTH */}
          <Route path="/" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/grupos" exact component={Grupos} />

          {/* PERFIL MAESTRO */}
          <Route path="/usuario/:id" exact component={MaestroGeneral} />
          <Route path="/usuario/:id/editar" component={MaestroEditar} />

          {/* INSTRUMENTACION DIDACTICA */}
          <Route path="/instrumentacion/:id" exact component={asyncID} />
          <Route path="/instrumentacion/editar/:id" exact component={asyncIDEditar} />

          {/* LO DEL JULIO */}
          <Route path="/instrumentos" exact component={asyncMenuInstrumentos} />
          <Route path="/rubrica" exact component={asyncRubrica} />
          <Route path="/listacotejo" exact component={asyncListaCotejo} />
          <Route path="/listaobservacion" component={asyncListaObservacion} />

          {/* EXAMEN */}
          <Route path="/examen" exact component={asyncDashboardExamen} />
          <Route path="/examen/crear" component={asyncCrearExamen} />
          <Route path="/examen/asignar" component={asyncAsignarExamen} />
          
          <Route path="/examen/reactivo/abierto" component={CrearReactivoAbierto} />
          <Route path="/examen/reactivo/fv" component={CrearReactivoFV} />
          <Route path="/examen/reactivo/multiple" component={CrearReactivoMultiple} />
          <Route path="/examen/reactivos" component={BancoReactivos} />
          <Route path="/examen/resultados/respuestas" component={Respuestas} />
          <Route path="/examen/resultados" component={Resultados} />
          <Route path="/examen/editar" exact component={asyncEditarExamen} />
          <Route path="/examen/id" component={asyncContenedorExamen} />

          {/* LO DEL CARLOS */}
          <Route path="/trabajo-individual" component={asyncExposiciones} />

          {/* NOT FOUND */}
          <Route component={asyncNotFound} />
        </Switch>
      );
      if (this.props.isAdmin) {
        routes = (
          <Switch>
            {/* AUTH */}
            <Route path="/" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/grupos" exact component={Grupos} />

            {/* PERFIL MAESTRO */}
            <Route path="/usuario/:id" exact component={MaestroGeneral} />
            <Route path="/usuario/:id/editar" component={MaestroEditar} />

            {/* INSTRUMENTACION DIDACTICA */}
            <Route path="/instrumentacion/:id" exact component={asyncID} />
            <Route path="/instrumentacion/editar/:id" exact component={asyncIDEditar} />

            {/* LO DEL JULIO */}
            <Route path="/instrumentos" exact component={asyncMenuInstrumentos} />
            <Route path="/rubrica" exact component={asyncRubrica} />
            <Route path="/listacotejo" exact component={asyncListaCotejo} />
            <Route path="/listaobservacion" component={asyncListaObservacion} />

            {/* EXAMEN */}
            <Route path="/examen" exact component={asyncDashboardExamen} />
            <Route path="/examen/crear" exact component={asyncCrearExamen} />
            <Route path="/examen/editar" exact component={asyncEditarExamen} />
            <Route path="/examen/asignar" exact component={asyncAsignarExamen} />
            <Route path="/examen/id" component={asyncContenedorExamen} />

            {/* LO DEL CARLOS */}
            <Route path="/trabajo-individual" component={asyncExposiciones} />

            {/* ADMIN */}
            <Route path="/admin" exact component={asyncAdmin} />
            <Route path="/admin/materias" exact component={asyncAdminMateria} />
            <Route path="/admin/grupos" exact component={asyncAdminGrupo} />

            {/* NOT FOUND */}
            <Route component={asyncNotFound} />
          </Switch>
        );
      }
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
    isAdmin: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).userType == 1 : false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
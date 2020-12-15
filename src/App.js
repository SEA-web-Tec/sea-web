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
import AppTheme from "./AppTheme";
// reactivos
import CrearReactivoAbierto from "./containers/Examen/CrearReactivo/CrearReactivoAbierto.js";
import CrearReactivoFV from "./containers/Examen/CrearReactivo/CrearReactivoFV.js";
import CrearReactivoMultiple from "./containers/Examen/CrearReactivo/CrearReactivoMultiple.js";
import BancoReactivos from "./containers/Examen/BancoReactivos/BancoReactivos.js";
import Resultados from "./containers/Examen/ResultadosExamen/Resultados.js";
import Respuestas from "./containers/Examen/ResultadosExamen/Respuestas.js";
import MaestroGeneral from "containers/Perfil/Maestro/General/MaestroGeneral";
import MaestroEditar from "containers/Perfil/Maestro/Editar/MaestroEditar";

const asyncID = asyncComponent(() => {
  return import("./containers/ID/ID");
});

const asyncIDEditar = asyncComponent(() => {
  return import("./containers/ID/IDeditar");
});

const asyncIDEvaluar = asyncComponent(() => {
  return import("./containers/ID/IDEvaluar");
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

const asyncTrabajo = asyncComponent(() => {
  return import("./components/TrabajoIndividual/TrabajoIndividual");
});

const asyncAdminMateria = asyncComponent(() => {
  return import("./containers/Admin/Materia/Materia");
});

const asyncAdminGrupo = asyncComponent(() => {
  return import("./containers/Admin/Grupo/Grupo");
});

class App extends Component {
  async componentDidMount() {
    await this.props.onAuthCheck();
    if (this.props.user != null) await this.props.onFetchGrupos(this.props.token, this.props.user.id);
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

    ////////////
    //
    //
    //  RECUERDEN AGREGAR LAS RUTAS EN AMBAS PARTES, DONDE
    //  DICE *this.props.isAuthenticated* Y *this.props.isAdmin*
    //  PD: Ponganle un parametro de :id para que jale la portada(Si usa)
    //
    //
    ///////////
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* AUTH */}
          <Route path="/" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/grupos" exact component={Grupos} />

          {/* PERFIL MAESTRO */}
          <Route path="/perfil/" exact component={MaestroGeneral} />
          <Route path="/perfil/editar" component={MaestroEditar} />

          {/* INSTRUMENTACION DIDACTICA */}
          <Route path="/instrumentacion/:id" exact component={asyncID} />
          <Route path="/instrumentacion/:id/editar" exact component={asyncIDEditar} />

          {/* LO DEL JULIO */}
          <Route path="/instrumentos" exact component={asyncMenuInstrumentos} />
          <Route path="/rubrica" exact component={asyncRubrica} />
          <Route path="/listacotejo" exact component={asyncListaCotejo} />
          <Route path="/listaobservacion" exact component={asyncListaObservacion} />

          {/* EXAMEN */}
          <Route path="/examen/:id" exact component={asyncDashboardExamen} />
          <Route path="/examen/:id/crear" exact component={asyncCrearExamen} />
          {/* <Route path="/examen/:id/editar" exact component={asyncEditarExamen} /> */}
          <Route path="/examen/:id/asignar" exact component={asyncAsignarExamen} />
          {/* <Route path="/examen/:id/preview" exact component={asyncContenedorExamen} /> */}
          <Route path="/examen/:id/reactivos" exact component={BancoReactivos} />
          <Route path="/examen/:id/reactivo/abierto" exact component={CrearReactivoAbierto} />
          <Route path="/examen/:id/reactivo/fv" exact component={CrearReactivoFV} />
          <Route path="/examen/:id/reactivo/multiple" exact component={CrearReactivoMultiple} />
          <Route path="/examen/:id/resultados" exact component={Resultados} />
          <Route path="/examen/:id/resultados/respuestas" exact component={Respuestas} />

          {/* LO DEL CARLOS */}
          <Route path="/trabajo-individual" exact component={asyncTrabajo} />

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
            <Route path="/perfil" exact component={MaestroGeneral} />
            <Route path="/perfil/editar" component={MaestroEditar} />

            {/* INSTRUMENTACION DIDACTICA */}
            <Route path="/instrumentacion/:id" exact component={asyncID} />
            <Route path="/instrumentacion/:id/editar" exact component={asyncIDEditar} />

            {/* LO DEL JULIO */}
            <Route path="/instrumentos" exact component={asyncMenuInstrumentos} />
            <Route path="/rubrica" exact component={asyncRubrica} />
            <Route path="/listacotejo" exact component={asyncListaCotejo} />
            <Route path="/listaobservacion" exact component={asyncListaObservacion} />

            {/* EXAMEN */}
            <Route path="/examen/:id" exact component={asyncDashboardExamen} />
            <Route path="/examen/:id/crear" exact component={asyncCrearExamen} />
            <Route path="/examen/:id/editar/:id_examen" exact component={asyncEditarExamen} />
            <Route path="/examen/:id/asignar" exact component={asyncAsignarExamen} />
            {/* <Route path="/examen/:id/preview" exact component={asyncContenedorExamen} /> */}
            <Route path="/examen/:id/reactivos" exact component={BancoReactivos} />
            <Route path="/examen/:id/reactivo/abierto" exact component={CrearReactivoAbierto} />
            <Route path="/examen/:id/reactivo/fv" exact component={CrearReactivoFV} />
            <Route path="/examen/:id/reactivo/multiple" exact component={CrearReactivoMultiple} />
            <Route path="/examen/:id/resultados" exact component={Resultados} />
            <Route path="/examen/:id/resultados/respuestas" exact component={Respuestas} />

            {/* LO DEL CARLOS */}
            <Route path="/trabajo-individual" exact component={asyncTrabajo} />

            {/* ADMIN */}
            <Route path="/admin/materias" exact component={asyncAdminMateria} />
            <Route path="/admin/grupos" exact component={asyncAdminGrupo} />
            <Route path="/instrumentacion/evaluar" exact component={asyncIDEvaluar} />

            {/* NOT FOUND */}
            <Route component={asyncNotFound} />
          </Switch>
        );
      }
    }

    const titulo = "pepe";
    return (
      <AppTheme>
        <CssBaseline />
        <Layout titulo={titulo}>{routes}</Layout>
      </AppTheme>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAdmin: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).userType === 1 : false,
    token: state.auth.token,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheckState()),
    onFetchGrupos: (token, userId) => dispatch(actions.fetchGrupos(token, userId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

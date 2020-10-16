import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { CssBaseline } from "@material-ui/core";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import Login from "./containers/Login/Login";
import Logout from "./containers/Login/Logout/Logout";
import Grupos from "./containers/Grupos/Grupos";

const asyncID = asyncComponent(() => {
  return import("./containers/ID/ID");
});

const asyncMenuInstrumentos = asyncComponent(() => {
  return import("./containers/MenuInstrumentos/MenuInstrumentos");
});

const asyncRubrica = asyncComponent(() => {
  return import("./containers/Rubrica/Rubrica");
});

const asyncAsignarExamen = asyncComponent(() => {
  return import("./containers/Examen/AsignarExamen/AsignarExamen");
});

const asyncNotFound = asyncComponent(() => {
  return import("./containers/NotFound/NotFound");
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
          <Route path="/grupos" component={Grupos} />
          <Route path="/instrumentacion" component={asyncID} />
          <Route path="/instrumentos" component={asyncMenuInstrumentos} />
          <Route path="/rubrica" component={asyncRubrica} />
          <Route path="/examenes/asignar" component={asyncAsignarExamen} />
          <Route component={asyncNotFound} />
        </Switch>
      );
    }

    return (
      <Fragment>
        <CssBaseline />
        <Layout>{routes}</Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

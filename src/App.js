import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./containers/Login/Login";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    );

    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;

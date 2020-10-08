import React, { Component } from "react";
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Top Bar</div>
        <div>Side Bar</div>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;

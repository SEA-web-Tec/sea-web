import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import ExamenesStepper from "components/Examenes/ExamenesStepper/ExamenesStepper";

class ContenedorExamen extends Component {
  render(props) {
    const { classes } = this.props;
    return <ExamenesStepper />;
  }
}

export default withStyles(useStyles)(ContenedorExamen);

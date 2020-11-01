import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import ExamenesListItem from "./ExamenesListItem/ExamenesListItem";

const useStyles = makeStyles((theme) => ({
  ExamenesList: {
    width: "100%"
  }
}));

function ExamenesList(props) {
  const classes = useStyles();

  return (
    <List className={classes.ExamenesList}>
      <ExamenesListItem titulo="Diagnostico" grupo="F" estado="Finalizado" fecha="21/10/2020" terminado />
      <ExamenesListItem titulo="Sumativo" grupo="G" estado="Pendiente" fecha="03/08/2019" />
    </List>
  );
}

export default ExamenesList;

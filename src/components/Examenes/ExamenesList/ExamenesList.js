import React from "react";
import { List } from "@material-ui/core";
import ExamenesListItem from "./ExamenesListItem/ExamenesListItem";

function ExamenesList(props) {
  return (
    <List dense style={{ width: "100%" }}>
      <ExamenesListItem done />
      <ExamenesListItem done />
      <ExamenesListItem done />
    </List>
  );
}

export default ExamenesList;

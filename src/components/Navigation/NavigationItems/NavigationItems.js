import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classesCss from "./NavigationItems.module.css";
import ButtonInline from "../../UI/ButtonInline/ButtonInline";
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const NavigationItems = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul className={classesCss.NavigationItems}>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <ButtonInline estilo={classes.root}>{"Unidad 1"}</ButtonInline>
          <ButtonInline estilo={classes.root}>{"Unidad 2"}</ButtonInline>
          <ButtonInline estilo={classes.root}>{"Unidad 3"}</ButtonInline>
          <ButtonInline estilo={classes.root}>{"Unidad 4"}</ButtonInline>
          <ButtonInline estilo={classes.root}>{"Unidad 5"}</ButtonInline>
        </ButtonGroup>
      </ul>
    </div>
  );
};

export default NavigationItems;

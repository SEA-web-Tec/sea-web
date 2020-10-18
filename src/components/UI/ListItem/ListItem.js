import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import useStyles from "./ListItem.styles";

const ListItem = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.ListItem}>
      <div className={classes.Label}>
        <Typography>{props.label}</Typography>
      </div>
      <div className={classes.Content}>
        <Typography> {props.content}</Typography>
      </div>
    </div>
  );
};

export default ListItem;

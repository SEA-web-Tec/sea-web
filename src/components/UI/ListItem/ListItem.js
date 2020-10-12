import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ListItem: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginBottom: theme.spacing(1),
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    "&:last-child": {
      marginBottom: 0
    }
  },
  Label: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px"
  },
  Content: {
    backgroundColor: "#DDD",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    width: "100%"
  }
}));

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

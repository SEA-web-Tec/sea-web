import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      justifyContent: "flexEnd",
    },
  },
}));

export default function OpcionesRenglon(props) {
  const classes = useStyles();
  return (
    <div>
      <Box
        boxShadow={0}
        mt={0.12}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <div className={classes.root}>
          <IconButton color="primary" onClick={props.onClickSubir}>
            <ArrowUp />
          </IconButton>
          <IconButton color="primary" onClick={props.onClickEliminar}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={props.onClickBajar}>
            <ArrowDown />
          </IconButton>
        </div>
      </Box>
      <TextField type="number" style={{ visibility: "hidden" }} />
    </div>
  );
}

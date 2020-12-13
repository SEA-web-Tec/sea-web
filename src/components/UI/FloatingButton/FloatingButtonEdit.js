import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

//Editar
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(3),
  },
  icono: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
}));

/**
 * Vista Previa
 * Mandar a editar
 * PDF
 *
 * Editar
 * Enviar
 * Regresar
 *
 */

export default function FloatingButtonEdit(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const regresar = () => {
    handleClose();
    history.push("/instrumentacion/" + props.grupo);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          key={"Enviar"}
          icon={<SendIcon />}
          className={classes.icono}
          classes={{ staticTooltipLabel: classes.icono }}
          tooltipTitle={"Enviar"}
          tooltipOpen={true}
          onClick={() => {
            props.enviar();
          }}
        />
        <SpeedDialAction
          key={"Regresar"}
          icon={<ArrowBackIcon />}
          className={classes.icono}
          classes={{ staticTooltipLabel: classes.icono }}
          tooltipTitle={"Regresar"}
          tooltipOpen
          onClick={() => {
            regresar();
          }}
        />
      </SpeedDial>
    </div>
  );
}

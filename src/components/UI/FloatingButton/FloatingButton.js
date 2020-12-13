import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

//vista previa
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import EditIcon from "@material-ui/icons/Edit";
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
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
}));

export default function FloatingButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const history = useHistory();

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editar = () => {
    handleClose();
    history.push("/instrumentacion/" + props.grupo + "/editar");
  };

  const regresar = () => {
    handleClose();
    history.push("/grupos");
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
          key={"Editar"}
          icon={<EditIcon />}
          className={classes.icono}
          classes={{ staticTooltipLabel: classes.icono }}
          tooltipTitle={"Editar"}
          tooltipOpen={true}
          onClick={() => {
            editar();
          }}
        />
        {props.estado == "Aprobada" ? (
          <SpeedDialAction
            key={"pdf"}
            icon={<PictureAsPdfIcon />}
            className={classes.icono}
            classes={{ staticTooltipLabel: classes.icono }}
            tooltipTitle={"Descargar"}
            tooltipOpen
            onClick={() => {
              props.crearPDF();
            }}
          />
        ) : null}
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

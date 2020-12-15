import React from "react";
import {
  Card,
  CardContent,
  Typography,
  // IconButton,
  makeStyles,
} from "@material-ui/core";
//import { withStyles } from '@material-ui/core/styles';
//import { MoreVert } from "@material-ui/icons";
import MenuOpciones from "../../UI/MenuOpciones/MenuOpciones";
import { MenuItem, Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  alinear: {
    display: "flex",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function Instrumento(props) {
  const classes = useStyles();
  let color = "primary";
  switch (props.tipo) {
    case "Rubrica":
     color = "#F00"
      break;
    case "Lista de Cotejo":
      color = "#00F"
      break;
    case "Lista de Observacion":
      color = "#0F0"
      break;
    default:
      break;
  }
  // console.log(classes.alinear);
  return (
    <Card>
      <CardContent>
        <div className={classes.alinear}>
          <Typography
            variant="body2"
            color={"primary"}
            component="p"
            display="block"
            align="left"
            className={classes.bold}
            style={{color:color}}
          >
            {props.nombre}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            display="block"
            align="right"
          >
            {props.fecha}
          </Typography>
        </div>
        <div className={classes.alinear}>
          <div>
            <br />
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              display="inline"
            >
              {props.descripcion}
            </Typography>
          </div>
          {/* <IconButton aria-label="settings">
            <MoreVert />
          </IconButton> */}
          <MenuOpciones>
            {" "}
            <MenuItem onClick={props.modificar}>Modificar</MenuItem>
            {/*<MenuItem>Descargar</MenuItem>*/}
            <Divider />
            <MenuItem onClick={props.eliminar}>Eliminar</MenuItem>
          </MenuOpciones>
        </div>
      </CardContent>
    </Card>
  );
}

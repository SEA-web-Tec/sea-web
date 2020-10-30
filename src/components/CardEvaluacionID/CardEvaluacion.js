import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./CardEvaluacion.styles";

import { Grid } from "@material-ui/core";

export default function CardEvaluacion() {
  const classes = useStyles();
  const [intrumentaciones, setIntrumentaciones] = useState([]);
  const bull = <span className={classes.bullet}>•</span>;

  /*
  {id:0,
    carrera:,
    materia:,
    nombreP:,
    fecha:
  }
  */

  if (intrumentaciones.length == 0) {
    var arreglo = [...intrumentaciones];
    arreglo.push({
      id: 0,
      carrera: "ISC",
      materia: "Ejemplo de materia computacional",
      nombreP: "Juan de Ejemplo Carreras Prisa",
      fecha: "28/10/2020",
    });
    arreglo.push({
      id: 1,
      carrera: "ISC",
      materia: "Ejemplo de materia computacional 2",
      nombreP: "Juan de Ejemplo Carreras Prisa 2",
      fecha: "29/10/2020",
    });
    setIntrumentaciones(arreglo);
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        {intrumentaciones.map((intrumentacion) => {
          return (
            <div className={classes.ListItem} key={intrumentacion.id}>
              <div className={classes.Content}>
                <Typography>{intrumentacion.carrera}</Typography>
                <Typography>{intrumentacion.fecha}</Typography>
                <Typography>{intrumentacion.materia}</Typography>
                <Typography>{intrumentacion.nombreP}</Typography>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

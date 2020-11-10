import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import useStyles from "./CardEvaluacion.styles";

import {
  Grid,
  Chip,
  ListItemText,
  Typography,
  Drawer,
} from "@material-ui/core";

export default function CardEvaluacion() {
  const classes = useStyles();
  const [intrumentaciones, setIntrumentaciones] = useState([]);

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
      materia: "Segunda Materia",
      nombreP: "Juan de Ejemplo Carreras Prisa 2",
      fecha: "29/10/2020",
    });
    setIntrumentaciones(arreglo);
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          {intrumentaciones.map((intrumentacion) => {
            return (
              <Grid item xs={12} sm={6}>
                <div className={classes.ListItem} key={intrumentacion.id}>
                  <div className={classes.Content}>
                    <ListItemText
                      key={intrumentacion.id}
                      primary={
                        <Typography gutterBottom>
                          {intrumentacion.materia}
                        </Typography>
                      }
                      secondary={
                        <Grid container spacing={1} xs={6}>
                          <Grid item>
                            <Chip
                              size="small"
                              variant="outlined"
                              label={`Carrera: ${intrumentacion.carrera}`}
                            />
                          </Grid>
                          <Grid item>
                            <Chip
                              size="small"
                              variant="outlined"
                              label={`Nombre: ${intrumentacion.nombreP}`}
                            />
                          </Grid>
                          <Grid item>
                            <Chip
                              size="small"
                              variant="outlined"
                              label={`Fecha: ${intrumentacion.fecha}`}
                            />
                          </Grid>
                        </Grid>
                      }
                    />
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

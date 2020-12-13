import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Styles.js";
import { withStyles } from "@material-ui/core/styles";

import {
  Grid,
  Chip,
  ListItemText,
  Typography,
  Drawer,
} from "@material-ui/core";

class CardEvaluacion extends Component {
  render(props) {
    console.log(this.props.intrumentaciones);
    const { classes } = this.props;
    let agregarIntrumentacion = null;
    if (this.props.intrumentaciones.length != 0) {
      agregarIntrumentacion = this.props.intrumentaciones.map(
        (intrumentacion, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              key={intrumentacion.id}
              className={classes.addHover}
              onClick={() => {
                this.props.seleccionar(intrumentacion.id, index);
              }}
            >
              <div className={classes.ListItem} key={intrumentacion.id}>
                <div className={classes.Content}>
                  <ListItemText
                    key={intrumentacion.id}
                    primary={
                      <Typography gutterBottom>
                        {intrumentacion.materiaNombre}
                      </Typography>
                    }
                    secondary={
                      <Grid container spacing={1}>
                        <Grid item>
                          <Chip
                            size="small"
                            variant="outlined"
                            label={`Nombre: ${
                              intrumentacion.nombres +
                              " " +
                              intrumentacion.apellidoPaterno +
                              " " +
                              intrumentacion.apellidoMaterno
                            }`}
                          />
                        </Grid>
                        <Grid item>
                          <Chip
                            size="small"
                            variant="outlined"
                            label={`Grupo: ${intrumentacion.grupo}`}
                          />
                        </Grid>
                      </Grid>
                    }
                  />
                </div>
              </div>
            </Grid>
          );
        }
      );
    }

    return (
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            {agregarIntrumentacion}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(CardEvaluacion);

import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, CardMedia, Card, Grid, Box, Chip, CardContent } from "@material-ui/core";
import { Cancel, CheckCircle as CheckCircleIcon, RemoveCircle, WatchLater } from "@material-ui/icons";

class Portada extends Component {
  render(props) {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <CardMedia
            className={classes.cardHeaderBG}
            image={
              this.props.portada
                ? this.props.portada
                : "https://media.istockphoto.com/photos/bright-blue-defocused-blurred-motion-abstract-background-picture-id1047234038?k=6&m=1047234038&s=612x612&w=0&h=O1lP8GIn46sboZL5bnMsznd4A1tRNJ7iXm1MMVh5I5c="
            }
            title={this.props.materia}
          />
          <Grid container className={classes.cardHeaderContent}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Typography component="h2" variant="h6" noWrap>
                {this.props.materia}
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                {this.props.carrera}
              </Typography>
              <Typography component="p" variant="body2" gutterBottom style={{ marginTop: "12px" }}>
                {this.props.maestro}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Grid container className={classes.cardHeaderDetails}>
                <Grid item xs={8} sm={12} md={12} lg={12}>
                  <Box className={clsx(classes.box, classes.grupoPeriodoMobileBox)}>
                    <Box className={clsx(classes.box, classes.grupoPeriodoBox, classes.grupoPeriodoMobileItemBox)}>
                      <Typography component="p" variant="caption">
                        Grupo
                      </Typography>
                      <Chip label={this.props.grupo} />
                    </Box>
                    <Box className={clsx(classes.box, classes.grupoPeriodoBox, classes.grupoPeriodoMobileItemBox)}>
                      <Typography component="p" variant="caption">
                        Periodo
                      </Typography>
                      <Chip label={this.props.periodo} />
                    </Box>
                  </Box>
                </Grid>
                {this.props.isID ? (
                  <Grid item xs={4} sm={12} md={12} lg={12}>
                    <Box className={clsx(classes.box, classes.statusBox)}>
                      <Typography component="p" variant="subtitle2">
                        {this.props.status}
                      </Typography>
                      {this.props.status === "Entregada" ? (
                        <WatchLater className={classes.entregadaIcon} fontSize="small" />
                      ) : this.props.status === "Aprobada" ? (
                        <CheckCircleIcon className={classes.aprobadaIcon} fontSize="small" />
                      ) : this.props.status === "Rechazada" ? (
                        <Cancel className={classes.rechazadaIcon} fontSize="small" />
                      ) : (
                        <RemoveCircle className={classes.abiertaIcon} fontSize="small" />
                      )}
                    </Box>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <CardContent className={clsx(this.props.hasTabs && classes.hasTabs)}>{this.props.children}</CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(Portada);

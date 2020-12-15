import React, { Component, useEffect } from "react";
import clsx from "clsx";
import { useStyles } from "./Styles";
import { Typography, CardMedia, Card, Grid, Box, Chip, CardContent, CircularProgress } from "@material-ui/core";
import { Cancel, CheckCircle as CheckCircleIcon, RemoveCircle, WatchLater } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions/index";

const Portada = (props) => {
  const classes = useStyles();
  const grupos = useSelector((state) => state.grupos.grupos);
  const grupo = grupos.find((grupo) => grupo.id == props.id);
  const user = useSelector((state) => state.auth.user);
  if (grupos && grupo && user) {
    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <CardMedia
            className={classes.cardHeaderBG}
            image={
              grupo.fotoPortada
                ? grupo.fotoPortada
                : "https://media.istockphoto.com/photos/bright-blue-defocused-blurred-motion-abstract-background-picture-id1047234038?k=6&m=1047234038&s=612x612&w=0&h=O1lP8GIn46sboZL5bnMsznd4A1tRNJ7iXm1MMVh5I5c="
            }
            title={grupo.nombre}
          />
          <Grid container className={classes.cardHeaderContent}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Typography component="h2" variant="h6" noWrap>
                {grupo.nombre}
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                {grupo.carrera}
              </Typography>
              <Typography component="p" variant="body2" gutterBottom style={{ marginTop: "12px" }}>
                {`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}
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
                      <Chip label={grupo.grupo} />
                    </Box>
                    <Box className={clsx(classes.box, classes.grupoPeriodoBox, classes.grupoPeriodoMobileItemBox)}>
                      <Typography component="p" variant="caption">
                        Periodo
                      </Typography>
                      <Chip label={`${grupo.periodo} ${grupo.anio}`} />
                    </Box>
                  </Box>
                </Grid>
                {props.isID ? (
                  <Grid item xs={4} sm={12} md={12} lg={12}>
                    <Box className={clsx(classes.box, classes.statusBox)}>
                      <Typography component="p" variant="subtitle2">
                        {props.status}
                      </Typography>
                      {props.status === "Entregada" ? (
                        <WatchLater className={classes.entregadaIcon} fontSize="small" />
                      ) : props.status === "Aprobada" ? (
                        <CheckCircleIcon className={classes.aprobadaIcon} fontSize="small" />
                      ) : props.status === "Rechazada" ? (
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
        <CardContent className={clsx(props.hasTabs && classes.hasTabs)}>{props.children}</CardContent>
      </Card>
    );
  } else {
    return <CircularProgress className={classes.spinner} />;
  }
};

export default Portada;

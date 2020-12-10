import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useStyles } from "./Styles";
import { Card, CardContent, CardActions, CardMedia, Grid, IconButton, Typography, Divider, Avatar } from "@material-ui/core";
import { FormatListBulletedOutlined as FormatListBulleted } from "@material-ui/icons";
import {
  CalificacionesOutlined as CalificacionesIcon,
  InstrumentacionOutlined as InstrumentacionIcon,
  TemarioOutlined as TemarioIcon
} from "../../assets/icons/Index";
import { blue, red, green, amber } from "@material-ui/core/colors";
import BigTooltip from "../UI/BigTooltip/BigTooltip";

const Grupo = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <CardMedia className={classes.cardMedia} image={props.portada} title={props.materia} />
        </div>
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar} alt={props.maestro} src={props.fotoPerfil} />
          <Typography component="h2" variant="h5" gutterBottom noWrap style={{ fontWeight: "500" }}>
            {props.materia}
          </Typography>
          <Typography gutterBottom noWrap>
            {props.carrera}
          </Typography>
          <Typography color="textSecondary">{props.maestro}</Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.cardActions} disableSpacing>
          <BigTooltip title="Calificaciones">
            <IconButton style={{ color: blue[600] }}>
              <CalificacionesIcon />
            </IconButton>
          </BigTooltip>
          <BigTooltip title="Lista">
            <IconButton style={{ color: red[600] }}>
              <FormatListBulleted />
            </IconButton>
          </BigTooltip>
          <BigTooltip title="Temario">
            <IconButton style={{ color: green[600] }}>
              <TemarioIcon />
            </IconButton>
          </BigTooltip>
          <BigTooltip title="Instrumentación Didáctica">
            <IconButton style={{ color: amber[600] }} component={RouterLink} to={`/instrumentacion/${props.id}`}>
              <InstrumentacionIcon />
            </IconButton>
          </BigTooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Grupo;

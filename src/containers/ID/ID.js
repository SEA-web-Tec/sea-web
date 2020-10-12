import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Typography,
  CardMedia,
  Card,
  Grid,
  Box,
  Chip,
  CardContent
} from "@material-ui/core";
import { CheckCircle as CheckCircleIcon } from "@material-ui/icons";
import SimpleTabs from "../../components/Navigation/Tabs/Tabs";

class ID extends Component {
  render(props) {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <CardMedia
            className={classes.headerBG}
            image="https://source.unsplash.com/random"
            title="Contemplative Reptile"
          />
          <Grid container className={classes.headerInfo}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Typography component="h2" variant="h6" noWrap>
                Programación de Dispositivos Móviles
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Ing. Sistemas Computacionales
              </Typography>
              <Typography
                component="p"
                variant="body2"
                gutterBottom
                style={{ marginTop: "12px" }}
              >
                José Tadeo Rodriguez Solano
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Grid container className={classes.subGrid}>
                <Grid item xs={8} sm={12} md={12} lg={12}>
                  <Box
                    className={clsx(classes.box, classes.grupoPeriodoMobileBox)}
                  >
                    <Box
                      className={clsx(
                        classes.box,
                        classes.grupoPeriodoBox,
                        classes.grupoPeriodoMobileItemBox
                      )}
                    >
                      <Typography component="p" variant="caption">
                        Grupo
                      </Typography>
                      <Chip label="F" />
                    </Box>
                    <Box
                      className={clsx(
                        classes.box,
                        classes.grupoPeriodoBox,
                        classes.grupoPeriodoMobileItemBox
                      )}
                    >
                      <Typography component="p" variant="caption">
                        Periodo
                      </Typography>
                      <Chip label="Enero - Junio 2020" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={12} md={12} lg={12}>
                  <Box className={clsx(classes.box, classes.statusBox)}>
                    <Typography component="p" variant="subtitle2">
                      Aprobada
                    </Typography>
                    <CheckCircleIcon
                      className={classes.checkIcon}
                      fontSize="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <CardContent className={classes.cardContent}>
          <SimpleTabs></SimpleTabs>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ID);

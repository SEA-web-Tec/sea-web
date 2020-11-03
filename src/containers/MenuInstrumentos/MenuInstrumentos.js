import React, { Component } from "react";
import { Grid, Box, Hidden } from "@material-ui/core";
import ListaInstrumentos from "../ListaInstrumentos/ListaInstrumentos";
import EventosPanel from "../../components/UI/EventosPanel/EventosPanel";

class MenuInstrumentos extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box m={2}></Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={2}>
            <Grid container spacing={4}>
              <Hidden xsDown>
                <Grid item xs={3}>
                  <EventosPanel />
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={6}>
                <ListaInstrumentos />
              </Grid>
              <Hidden xsDown>
                <Grid item xs={3}>
                  <EventosPanel />
                </Grid>
              </Hidden>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default MenuInstrumentos;

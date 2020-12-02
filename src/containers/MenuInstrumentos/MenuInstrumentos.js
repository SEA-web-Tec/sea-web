import React, { Component } from "react";
import { Grid, Box, Hidden, ButtonGroup } from "@material-ui/core";
import ListaInstrumentos from "../ListaInstrumentos/ListaInstrumentos";
import EventosPanel from "../../components/UI/EventosPanel/EventosPanel";
import FiltrarInstrumentos from "../../components/IDE/FiltrarInstrumentos/FiltrarInstrumentos";
import Button from "@material-ui/core/Button";

class MenuInstrumentos extends Component {
  state = {
    instrumentos: [
      {
        nombre: "Rubrica",
        descripcion: "Para exposicion",
        fecha: "06 de septiembre de 2019",
        tipo: "Rubrica",
      },
      {
        nombre: "Lista de cotejo",
        descripcion: "Para ensayo",
        fecha: "07 de septiembre de 2019",
        tipo: "Lista de Cotejo",
      },
      {
        nombre: "Lista de observacion",
        descripcion: "Para resumen",
        fecha: "08 de septiembre de 2019",
        tipo: "Lista de Observacion",
      },
    ],
    filtros: {
      rubrica: true,
      cotejo: true,
      observacion: true,
      carpeta: true,
    },
  };

  filtroHandleChange = (event) => {
    this.setState({
      filtros: {
        ...this.state.filtros,
        [event.target.name]: event.target.checked,
      },
    });
  };

  crearRubricaHandler = () => {
    this.props.history.push("/rubrica");
  };
  crearListaCotejoHandler = () => {
    this.props.history.push("/listacotejo");
  };
  crearListaObservacionHandler = () => {
    this.props.history.push("/listaobservacion");
  };
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
                  <FiltrarInstrumentos
                    filtros={this.state.filtros}
                    handleChange={this.filtroHandleChange}
                  />
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8}>
                <ButtonGroup color="primary" style={{marginBottom:"2%"}} >
                  <Button onClick={this.crearRubricaHandler}>
                    Crear rubrica
                  </Button>
                  <Button onClick={this.crearListaCotejoHandler}>
                    Crear lista de cotejo
                  </Button>
                  <Button onClick={this.crearListaObservacionHandler}>
                    Crear lista de observacion
                  </Button>
                </ButtonGroup>
               

                <ListaInstrumentos
                  instrumentos={this.state.instrumentos}
                  filtros={this.state.filtros}
                />
              </Grid>
              {/*
                <Hidden xsDown>
                  <Grid item xs={3}>
                    <EventosPanel />
                  </Grid>
                </Hidden>
              */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default MenuInstrumentos;

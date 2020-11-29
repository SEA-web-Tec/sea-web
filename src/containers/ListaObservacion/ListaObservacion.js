import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import OpcionesRenglon from "../../components/IDE/OpcionesRenglon/OpcionesRenglon";
import TituloColumnaInstrumento from "../../components/IDE/TituloColumnaInstrumento/TituloColumnaInstrumento";
import CeldaInstrumento from "../../components/IDE/CeldaInstrumento/CeldaInstrumento";

class ListaObservacion extends Component {
  state = {
    id: 1,
    nombre: "Lista para exposición",
    descripcion: "Esta es una descripción de la lista de observacion",
    id_personal: 1,
    rengloneslo: [
      {
        id: 1,
        numrenglon: 1,
        id_observacion: 1,
        criterio: "Este es un criterio 1",
        puntos: 10,
      },
      {
        id: 2,
        numrenglon: 2,
        id_observacion: 1,
        criterio: "Este es un criterio 2",
        puntos: 10,
      },
      {
        id: 3,
        numrenglon: 3,
        id_observacion: 1,
        criterio: "Este es un criterio 3",
        puntos: 10,
      },
    ],
  };

  agregarRenglon = () => {
    const renglonesActualizados = [...this.state.rengloneslo];
    const cantidadMaxRenglones = this.state.rengloneslo.reduce(
      (max, actual) => {
        return max > actual.numrenglon ? max : actual.numrenglon;
      },
      0
    );

    const id = Math.floor(Math.random() * (900000 - 100000)) + 100000;
    renglonesActualizados.push({
      id: id,
      criterio: "Agrega Criterio",
      numrenglon: cantidadMaxRenglones + 1,
      id_observacion: this.state.rengloneslo[0].id_observacion,
      puntos: 10,
    });
    this.setState({
      rengloneslo: renglonesActualizados,
    });
  };
  subirRenglon = (event, numrenglon) => {
    if (numrenglon > 1) {
      const renglonSubir = this.state.rengloneslo.findIndex(
        (renglon) => renglon.numrenglon === numrenglon
      );
      const renglonBajar = this.state.rengloneslo.findIndex(
        (renglon) => renglon.numrenglon === numrenglon - 1
      );

      let renglonesActualizados = [...this.state.rengloneslo];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        numrenglon: numrenglon - 1,
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        numrenglon: numrenglon,
      };

      this.setState({ rengloneslo: renglonesActualizados });
    }
  };
  bajarRenglon = (event, numrenglon) => {
    const cantidadMaxRenglones = this.state.rengloneslo.reduce(
      (max, actual) => {
        return max > actual.numrenglon ? max : actual.numrenglon;
      },
      0
    );
    if (numrenglon < cantidadMaxRenglones) {
      const renglonSubir = this.state.rengloneslo.findIndex(
        (renglon) => renglon.numrenglon === numrenglon + 1
      );
      const renglonBajar = this.state.rengloneslo.findIndex(
        (renglon) => renglon.numrenglon === numrenglon
      );

      let renglonesActualizados = [...this.state.rengloneslo];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        numrenglon: numrenglon,
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        numrenglon: numrenglon + 1,
      };

      this.setState({ rengloneslo: renglonesActualizados });
    }
  };

  eliminarRenglon = (event, numrenglon) => {
    const cantidadMaxRenglones = this.state.rengloneslo.reduce(
      (max, actual) => {
        return max > actual.numrenglon ? max : actual.numrenglon;
      },
      0
    );

    if (cantidadMaxRenglones > 1) {
      const renglonEliminado = this.state.rengloneslo.find(
        (renglon) => renglon.numrenglon === numrenglon
      );
      let renglonesActualizados = this.state.rengloneslo.filter(
        (renglon) => renglon.id !== renglonEliminado.id
      );

      const renglonesActualizadosNumRenglon = renglonesActualizados.map(
        (renglon) => {
          if (renglon.numrenglon > numrenglon) {
            return {
              id: renglon.id,
              criterio: renglon.criterio,
              numrenglon: renglon.numrenglon - 1,
              id_observacion: renglon.id_observacion,
              puntos: renglon.puntos,
            };
          } else {
            return renglon;
          }
        }
      );

      this.setState({
        rengloneslo: renglonesActualizadosNumRenglon,
      });
    }
  };
  cambioNumber = (event, numrenglon) => {
    const renglonIndex = this.state.rengloneslo.findIndex(
      (renglon) => renglon.numrenglon === numrenglon
    );

    let renglonesActualizados = [...this.state.rengloneslo];
    renglonesActualizados[renglonIndex] = {
      ...renglonesActualizados[renglonIndex],
      puntos: event.target.value,
    };

    this.setState({
      rengloneslo: renglonesActualizados,
    });
  };
  cambioNombreHandler = (event) => {
    this.setState({ nombre: event.target.value });
  };
  cambioDescripcionHandler = (event) => {
    this.setState({ descripcion: event.target.value });
  };

  criterioModificadoHandler = (event, numrenglon) => {
    const renglonModificadoIndex = this.state.rengloneslo.findIndex(
      (renglon) => renglon.numrenglon === numrenglon
    );
    let renglonesActualizados = [...this.state.rengloneslo];

    renglonesActualizados[renglonModificadoIndex] = {
      ...renglonesActualizados[renglonModificadoIndex],
      criterio: event.target.value,
    };

    this.setState({ rengloneslo: renglonesActualizados });
  };
  render() {
    const renglonesOrdenados = [...this.state.rengloneslo];
    renglonesOrdenados.sort((a, b) => a.numrenglon - b.numrenglon);
    const rengloneslo = renglonesOrdenados.map((renglon) => (
      <Grid container spacing={2} key={renglon.id}>
        <Grid item xs={2} sm={1}>
          <OpcionesRenglon
            onClickSubir={(event) =>
              this.subirRenglon(event, renglon.numrenglon)
            }
            onClickBajar={(event) =>
              this.bajarRenglon(event, renglon.numrenglon)
            }
            onClickEliminar={(event) =>
              this.eliminarRenglon(event, renglon.numrenglon)
            }
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <CeldaInstrumento
            texto={renglon.criterio}
            number={renglon.puntos}
            cambio={(event) =>
              this.criterioModificadoHandler(event, renglon.numrenglon)
            }
            cambioNumber={(event) =>
              this.cambioNumber(event, renglon.numrenglon)
            }
          />
        </Grid>
        <Hidden xsDown>
          <Grid item  sm={6}>
            <Box boxShadow={2} display="flex" flexDirection="column">
              <TextField
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                disabled
              />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    ));
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="textPrimary"
              component="p"
              display="block"
            >
              Lista de Observacion
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Titulo"
              value={this.state.nombre}
              onChange={this.cambioNombreHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              label="Descripcion"
              value={this.state.descripcion}
              onChange={this.cambioDescripcionHandler}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2} sm={1}>
                  <TituloColumnaInstrumento titulo="Opciones" />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TituloColumnaInstrumento titulo="Criterios" />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={6}>
                    <TituloColumnaInstrumento titulo="Observaciones" />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {rengloneslo}
              <Box display="flex" style={{ marginLeft: "25%" }}>
                <IconButton onClick={this.agregarRenglon}>
                  <AddIcon color="primary" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ListaObservacion;

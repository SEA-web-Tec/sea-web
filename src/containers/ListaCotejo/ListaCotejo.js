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

class ListaCotejo extends Component {
  state = {
    id: 1,
    nombre: "Lista para exposición",
    descripcion: "Esta es una descripción de la lista",
    id_personal: 1,
    rengloneslc: [
      {
        id: 1,
        numrenglon: 1,
        id_cotejo: 1,
        criterio: "Este es un criterio 1",
        ponderacion: 10,
      },
      {
        id: 2,
        numrenglon: 2,
        id_cotejo: 1,
        criterio: "Este es un criterio 2",
        ponderacion: 10,
      },
      {
        id: 3,
        numrenglon: 3,
        id_cotejo: 1,
        criterio: "Este es un criterio 3",
        ponderacion: 10,
      },
    ],
  };

  agregarRenglon = () => {
    const renglonesActualizados = [...this.state.rengloneslc];
    const cantidadMaxRenglones = this.state.rengloneslc.reduce(
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
      id_cotejo: this.state.rengloneslc[0].id_cotejo,
      ponderacion: 10,
    });
    this.setState({
      rengloneslc: renglonesActualizados,
    });
  };
  subirRenglon = (event, numrenglon) => {
    if (numrenglon > 1) {
      const renglonSubir = this.state.rengloneslc.findIndex(
        (renglon) => renglon.numrenglon === numrenglon
      );
      const renglonBajar = this.state.rengloneslc.findIndex(
        (renglon) => renglon.numrenglon === numrenglon - 1
      );

      let renglonesActualizados = [...this.state.rengloneslc];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        numrenglon: numrenglon - 1,
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        numrenglon: numrenglon,
      };

      this.setState({ rengloneslc: renglonesActualizados });
    }
  };
  bajarRenglon = (event, numrenglon) => {
    const cantidadMaxRenglones = this.state.rengloneslc.reduce(
      (max, actual) => {
        return max > actual.numrenglon ? max : actual.numrenglon;
      },
      0
    );
    if (numrenglon < cantidadMaxRenglones) {
      const renglonSubir = this.state.rengloneslc.findIndex(
        (renglon) => renglon.numrenglon === numrenglon + 1
      );
      const renglonBajar = this.state.rengloneslc.findIndex(
        (renglon) => renglon.numrenglon === numrenglon
      );

      let renglonesActualizados = [...this.state.rengloneslc];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        numrenglon: numrenglon,
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        numrenglon: numrenglon + 1,
      };

      this.setState({ rengloneslc: renglonesActualizados });
    }
  };

  eliminarRenglon = (event, numrenglon) => {
    const cantidadMaxRenglones = this.state.rengloneslc.reduce(
      (max, actual) => {
        return max > actual.numrenglon ? max : actual.numrenglon;
      },
      0
    );

    if (cantidadMaxRenglones > 1) {
      const renglonEliminado = this.state.rengloneslc.find(
        (renglon) => renglon.numrenglon === numrenglon
      );
      let renglonesActualizados = this.state.rengloneslc.filter(
        (renglon) => renglon.id !== renglonEliminado.id
      );

      const renglonesActualizadosNumRenglon = renglonesActualizados.map(
        (renglon) => {
          if (renglon.numrenglon > numrenglon) {
            return {
              id: renglon.id,
              criterio: renglon.criterio,
              numrenglon: renglon.numrenglon - 1,
              id_cotejo: renglon.id_cotejo,
              ponderacion: renglon.ponderacion,
            };
          } else {
            return renglon;
          }
        }
      );

      this.setState({
        rengloneslc: renglonesActualizadosNumRenglon,
      });
    }
  };
  cambioNumber = (event, numrenglon) => {
    const renglonIndex = this.state.rengloneslc.findIndex(
      (renglon) => renglon.numrenglon === numrenglon
    );

    let renglonesActualizados = [...this.state.rengloneslc];
    renglonesActualizados[renglonIndex] = {
      ...renglonesActualizados[renglonIndex],
      ponderacion: event.target.value,
    };

    this.setState({
      rengloneslc: renglonesActualizados,
    });
  };
  cambioNombreHandler = (event) => {
    this.setState({ nombre: event.target.value });
  };
  cambioDescripcionHandler = (event) => {
    this.setState({ descripcion: event.target.value });
  };

  criterioModificadoHandler = (event, numrenglon) => {
    const renglonModificadoIndex = this.state.rengloneslc.findIndex(
      (renglon) => renglon.numrenglon === numrenglon
    );
    let renglonesActualizados = [...this.state.rengloneslc];

    renglonesActualizados[renglonModificadoIndex] = {
      ...renglonesActualizados[renglonModificadoIndex],
      criterio: event.target.value,
    };

    this.setState({ rengloneslc: renglonesActualizados });
  };
  render() {
    const renglonesOrdenados = [...this.state.rengloneslc];
    renglonesOrdenados.sort((a, b) => a.numrenglon - b.numrenglon);
    const rengloneslc = renglonesOrdenados.map((renglon) => (
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
            number={renglon.ponderacion}
            cambio={(event) =>
              this.criterioModificadoHandler(event, renglon.numrenglon)
            }
            cambioNumber={(event) =>
              this.cambioNumber(event, renglon.numrenglon)
            }
          />
        </Grid>
        <Hidden xsDown>
          <Grid item  sm={3}>
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
        <Hidden xsDown>
          <Grid item  sm={3}>
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
              Lista de Cotejo
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
                  <Grid item sm={3}>
                    <TituloColumnaInstrumento titulo="Si" />
                  </Grid>
                </Hidden>
                <Hidden xsDown>
                  <Grid item  sm={3}>
                    <TituloColumnaInstrumento titulo="No" />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {rengloneslc}
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

export default ListaCotejo;

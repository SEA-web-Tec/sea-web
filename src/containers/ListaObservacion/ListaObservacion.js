import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import OpcionesRenglon from "../../components/IDE/OpcionesRenglon/OpcionesRenglon";
import TituloColumnaInstrumento from "../../components/IDE/TituloColumnaInstrumento/TituloColumnaInstrumento";
import CeldaInstrumento from "../../components/IDE/CeldaInstrumento/CeldaInstrumento";
import { http } from "shared/http";
import Snackbar from "@material-ui/core/Snackbar"
import { Alert } from "@material-ui/lab";
import FloatingButtonInstrumentos from "../../components/IDE/FloatingButtonInstrumentos/FloatingButtonInstrumentos";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class ListaObservacion extends Component {
  state = {
    editando:false,
    guardando: false,
    error: false,
    errorMessage: "",
    errorStatus: 0,
    id: 1,
    nombre: "Lista para exposición",
    descripcion: "Esta es una descripción de la lista de observacion",
    id_personal: this.props.userId,
    id_carpeta:1,
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

  componentDidMount() {
    const id = this.getUrlParameter("id");
    console.log(id);
    if (id) {
      this.setState({editando:true})
      http
        .get("/listasobservacion/consultalo/" + id)
        .then((response) => {
          const observacion = {
            id: response.data.Listasdeobservacion.id,
            nombre: response.data.Listasdeobservacion.nombre,
            descripcion: response.data.Listasdeobservacion.descripcion,
            id_personal: response.data.Listasdeobservacion.id_usuario,
            id_carpeta: 1,
          };
          this.setState({ ...observacion });
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.setState({
              error: true,
              errorMessage:
                "Ha ocurrido un error, favor de intentarlo más tarde",
              errorStatus: 500,
            });
            console.log("d");
          } else {
            this.setState({
              error: true,
              errorMessage: error.response.data.message,
              errorStatus: error.response.status,
            });
            console.log(error.response.data.message);
          }
        });

      http
        .get("listasobservacion/consultarenglones/" + id)
        .then((response) => {
          this.setState({ rengloneslo: response.data.Listasdeobservacion });
          console.log(response.data.Listasdeobservacion);
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.setState({
              error: true,
              errorMessage:
                "Ha ocurrido un error, favor de intentarlo más tarde",
              errorStatus: 500,
            });
            console.log("d");
          } else {
            this.setState({
              error: true,
              errorMessage: error.response.data.message,
              errorStatus: error.response.status,
            });
            console.log(error.response.data.message);
          }
        });
    }
  }
  crearListaDeObservacion = () => {
    const observacion = {
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      id_usuario: this.state.id_personal,
      id_carpeta: this.state.id_carpeta,
    };
    const renglones = this.state.rengloneslo.map((observacion) => {
      return {
        numrenglon: observacion.numrenglon,
        criterio: observacion.criterio,
        puntos: observacion.puntos,
      };
    });
    console.log(
      "Procesando...",
      observacion,
      renglones,
      this.state.rengloneslc
    );
    const url = this.state.editando ? "listasobservacion/editar/"+this.state.id : "listasobservacion/crear";
    this.setState({ guardando: true });
    http
      .post(url, {
        Listasdeobservacion: observacion,
        Renglones_lo: renglones,
      })
      .then((response) => {
        this.setState({
          error: true,
          errorMessage: response.data.message,
          errorStatus: 201,
          guardando: false,
        });
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({
            error: true,
            errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
            errorStatus: 500,
            guardando: false,
          });
          console.log("d");
        } else {
          this.setState({
            error: true,
            errorMessage: error.response.data.message,
            errorStatus: error.response.status,
            guardando: false,
          });
          console.log(error.response.data.message);
        }
      });
  };

  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
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

  descargarPDF = () => {
    const renglonesOrdenados = this.state.rengloneslo.sort(((a, b) => a.numrenglon - b.numrenglon));
    
    const body = renglonesOrdenados.map((renglon) => {
      const b = [];
      b.push(renglon.criterio + "\r\rPuntos: " + renglon.puntos);
      b.push("");
      b.push("");
      return b;
    });
    console.log(body);
    const rubrica = jsPDF();
    const finalY = rubrica.lastAutoTable.finalY || 10;
    rubrica.setFontSize(12);
    const textWidth = rubrica.getStringUnitWidth(this.state.nombre) * rubrica.internal.getFontSize() / rubrica.internal.scaleFactor;
    const textOffset = (rubrica.internal.pageSize.width - textWidth) / 2;
    rubrica.text(textOffset, finalY, this.state.nombre);
    rubrica.text(this.state.descripcion, 15, finalY + 15,{
      styles: { fontSize: 5 }})
    rubrica.autoTable({
        startY: finalY+ 20,
        head: [['Criterio', 'Observaciones', 'Puntuacion']],
        body: body 
      })
    rubrica.save("listadeobservacion.pdf");
  }
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
          <Grid item sm={6}>
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
    let boton;
    if (!this.state.guardando) {
      boton = (
        <Button variant="contained" color="primary" onClick={this.crearListaDeObservacion}>
          Guardar
        </Button>
      )
    }else{
      boton = (
        <CircularProgress variant="indeterminate" disableShrink size={40}/>
      )
    }
    let error = (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.state.error}
        onClose={() => {
          this.setState({ error: false });
        }}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity={this.state.errorStatus === 201 ? "success" : "warning"}>
          {this.state.errorMessage !== "" ? this.state.errorMessage : "Favor de realizar el CAPTCHA antes de registrarte!"}
        </Alert>
      </Snackbar>
    );
    return (
      <div>
        <Grid container spacing={2}>
          {error}
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
          <Grid item xs={6} sm={12}>
            <FloatingButtonInstrumentos guardar={this.crearListaDeObservacion} crearPDF={this.descargarPDF}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      token: state.auth.token,
      userId: state.auth.user.id,
      isAuthenticated: state.auth.token !== null,
  };
};


export default connect(mapStateToProps, null)(ListaObservacion);

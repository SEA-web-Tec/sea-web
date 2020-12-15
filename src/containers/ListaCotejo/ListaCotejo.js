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
import Snackbar from "@material-ui/core/Snackbar"
import { Alert } from "@material-ui/lab";
import FloatingButtonInstrumentos from "../../components/IDE/FloatingButtonInstrumentos/FloatingButtonInstrumentos";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { http } from "shared/http";

class ListaCotejo extends Component {
  state = {
    editando:false,
    guardando:false,
    error:false,
    errorMessage:"",
    errorStatus:0,
    id: 1,
    nombre: "",
    descripcion: "",
    id_personal: this.props.userId,
    id_carpeta:1,
    rengloneslc: [
      {
        id: 1,
        numrenglon: 1,
        id_cotejo: 1,
        criterio: "Agrega criterio",
        puntos: 10,
      },
     /* {
        id: 2,
        numrenglon: 2,
        id_cotejo: 1,
        criterio: "Este es un criterio 2",
        puntos: 10,
      },
      {
        id: 3,
        numrenglon: 3,
        id_cotejo: 1,
        criterio: "Este es un criterio 3",
        puntos: 10,
      },*/
    ],
  };


  componentDidMount() {
    const id = this.getUrlParameter("id");
    //console.log(id);
    if(id) {
      this.setState({editando:true})
      http
        .get("listacotejo/consultalc/"+id)
        .then((response) => {
          const cotejo = {
            id:response.data.Listasdecotejo.id,
            nombre:response.data.Listasdecotejo.nombre,
            descripcion:response.data.Listasdecotejo.descripcion,
            id_personal:response.data.Listasdecotejo.id_usuario,
            id_carpeta:1
          }
          this.setState({ ...cotejo });
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.setState({
              error: true,
              errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
              errorStatus: 500
            });
          } else {
            this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status });
            //console.log(error.response.data.message)
          }
        });

        http
        .get("listacotejo/consultarenglones/"+id)
        .then((response) => {
          this.setState({ rengloneslc:response.data.Listasdecotejo });
          //console.log(response.data.Listasdecotejo )
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.setState({
              error: true,
              errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
              errorStatus: 500
            });
          } else {
            this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status });
            //console.log(error.response.data.message)
          }
        });

    }
  }

  crearListaDeCotejo = () => {
    if(this.state.nombre !== "") {
      const cotejo = {
        nombre:this.state.nombre,
        descripcion:this.state.descripcion,
        id_usuario:this.state.id_personal,
        id_carpeta:this.state.id_carpeta
      }
      const renglones = this.state.rengloneslc.map((cotejo)=>{
        return {
          numrenglon: cotejo.numrenglon,
          criterio: cotejo.criterio,
          puntos: cotejo.puntos
        }
      });
     // console.log("Procesando...",cotejo,renglones,this.state.rengloneslc);
      const url = this.state.editando ? "listacotejo/editar/"+this.state.id : "listacojeto/crear";
      this.setState({ guardando:true });
      http
      .post(url, {
        Listasdecotejo:cotejo,
        Renglones_lc:renglones
      })
      .then((response) => {
        this.setState({ error: true, errorMessage: response.data.message, errorStatus: 201,/*guardando:false*/ });
        //console.log(response.data)
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({
            error: true,
            errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
            errorStatus: 500,
            guardando:false
          });
        } else {
          this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status,guardando:false });
          //console.log(error.response.data.message)
        }
      });
    }else{
      this.setState({error:true,errorMessage:"Ingrese un nombre"});
    }

  }
  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
      puntos: 10,
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
              puntos: renglon.puntos,
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
      puntos: event.target.value,
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

  descargarPDF = () => {
    const renglonesOrdenados = this.state.rengloneslc.sort(((a, b) => a.numrenglon - b.numrenglon));
    
    const body = renglonesOrdenados.map((renglon) => {
      const b = [];
      b.push(renglon.criterio + "\r\rPuntos: " + renglon.puntos);
      b.push("SI cumple ");
      b.push("NO cumple");
      return b;
    });
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
        head: [['Criterio', 'Si', 'No']],
        body: body 
      })
    rubrica.save("listadecotejo.pdf");
  }

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

    let boton;
    if (!this.state.guardando) {
      boton = (
        <Button variant="contained" color="primary" onClick={this.crearListaDeCotejo}>
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
          if(this.state.guardando&& this.state.editando===false) {
            this.props.history.push("/instrumentos");
          }
        }}
        autoHideDuration={500}
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
          <Grid item xs={6} sm={12}>
            <FloatingButtonInstrumentos guardar={this.crearListaDeCotejo} crearPDF ={this.descargarPDF}/>
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


export default connect(mapStateToProps, null)(ListaCotejo);

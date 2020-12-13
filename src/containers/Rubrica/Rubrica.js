import React, { Component } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box, Button,CircularProgress, Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ColumnaInstrumento from "../../components/IDE/ColumnaInstrumento/ColumnaInstrumento";
import ColumnaOpcionesInstrumento from "../../components/IDE/ColumnaOpcionesInstrumento/ColumnaOpcionesInstrumento";
import AddIcon from "@material-ui/icons/Add";
import { http } from "shared/http";

class Rubrica extends Component {
  state = {
    guardando:false,
    error:false,
    errorMessage:"",
    errorStatus:0,
    rubrica: [],
    id: 1,
    nombre: "Este es un nombre",
    descripcion: "Esta es una descripción de la rúbrica",
    id_personal: 1,
    id_carpeta:1,
    /*Las columnas deben de estar ordenas por num_columna */
    columnas: [
      { id: 1, titulo: "Excelente", num_columna: 1, id_instrumento: 1 },
      { id: 2, titulo: "Bueno", num_columna: 2, id_instrumento: 1 },
      { id: 3, titulo: "Regular", num_columna: 3, id_instrumento: 1 },
      { id: 4, titulo: "Suficiente", num_columna: 4, id_instrumento: 1 },
      { id: 5, titulo: "Insuficiente", num_columna: 5, id_instrumento: 1 },
    ],
    renglones: [
      { id: 1, criterio: "Criterio 1", num_renglon: 1, id_instrumento: 1 },
      /*{ id: 2, criterio: "Criterio 2", num_renglon: 2, id_instrumento: 1 },
      { id: 3, criterio: "Criterio 3", num_renglon: 3, id_instrumento: 1 },*/
    ],
    celdas: [
      {
        id: 11,
        texto: "Cumplió con los requisitos 11",
        id_renglon: 1,
        id_columna: 1,
        puntos_max: 50
      },
      /*{
        id: 21,
        texto: "Cumplió con los requisitos 21",
        id_renglon: 2,
        id_columna: 1,
        puntos_max: 50
      },
      {
        id: 31,
        texto: "Cumplió con los requisitos 31",
        id_renglon: 3,
        id_columna: 1,
        puntos_max: 50
      },*/
      {
        id: 12,
        texto: "Cumplió con los requisitos 12",
        id_renglon: 1,
        id_columna: 2,
        puntos_max: 5,
      },
      {
        id: 13,
        texto: "Cumplió con los requisitos 13",
        id_renglon: 1,
        id_columna: 3,
        puntos_max: 50
      },
      {
        id: 14,
        texto: "Cumplió con los requisitos 14",
        id_renglon: 1,
        id_columna: 4,
        puntos_max: 50
      },
      {
        id: 15,
        texto: "Cumplió con los requisitos 15",
        id_renglon: 1,
        id_columna: 5,
        puntos_max: 50,
      },
      /*{
        id: 22,
        texto: "Cumplió con los requisitos 22",
        id_renglon: 2,
        id_columna: 2,
        puntos_max: 50,
      },
      {
        id: 23,
        texto: "Cumplió con los requisitos 23",
        id_renglon: 2,
        id_columna: 3,
        puntos_max: 50,
      },
      {
        id: 24,
        texto: "Cumplió con los requisitos 24",
        id_renglon: 2,
        id_columna: 4,
        puntos_max: 50,
      },
      {
        id: 25,
        texto: "Cumplió con los requisitos 25",
        id_renglon: 2,
        id_columna: 5,
        puntos_max: 50,
      },
      {
        id: 32,
        texto: "Cumplió con los requisitos 32",
        id_renglon: 3,
        id_columna: 2,
        puntos_max: 50,
      },
      {
        id: 33,
        texto: "Cumplió con los requisitos 33",
        id_renglon: 3,
        id_columna: 3,
        puntos_max: 50,
      },
      {
        id: 34,
        texto: "Cumplió con los requisitos 34",
        id_renglon: 3,
        id_columna: 4,
        puntos_max: 50,
      },
      {
        id: 35,
        texto: "Cumplió con los requisitos 35",
        id_renglon: 3,
        id_columna: 5,
        puntos_max: 50,
      },*/
    ],
  };

  componentDidMount() {

    const id = this.getUrlParameter("id");
    console.log(id);

    if(id){
      http
      .get("rubrica/consultarub/"+id)
      .then((response) => {
        const rubrica = {
          id:response.data.Rubrica.id,
          nombre:response.data.Rubrica.nombre,
          descripcion:response.data.Rubrica.descripcion,
          id_personal:response.data.Rubrica.id_usuario,
          id_carpeta:0
        }
        this.setState({ ...rubrica });
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({
            error: true,
            errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
            errorStatus: 500
          });
          console.log("d")
        } else {
          this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status });
          console.log(error.response.data.message)
        }
      });

      http
      .get("rubrica/consultarenglones/"+id)
      .then((response) => {

        const renglones = response.data.Renglonesrubrica.map(renglon => {
          const r = {
            id:renglon.numrenglon,
            criterio:renglon.criterio,
            num_renglon:renglon.numrenglon,
            id_instrumento:renglon.id_rubrica
          };
          return r;
        });

        const celdasExcelente = response.data.Renglonesrubrica.map(celda=> {
          const c = {
            id: celda.numrenglon+"1",
            texto: celda.excelente,
            id_renglon: celda.numrenglon,
            id_columna: 1,
            puntos_max: celda.puntosexcelente,
          }
          return c;
        });
        const celdasBueno = response.data.Renglonesrubrica.map(celda=> {
          const c = {
            id: celda.numrenglon+"2",
            texto: celda.bueno,
            id_renglon: celda.numrenglon,
            id_columna: 2,
            puntos_max: celda.puntosbueno,
          }
          return c;
        });
        const celdasRegular = response.data.Renglonesrubrica.map(celda=> {
          const c = {
            id: celda.numrenglon+"3",
            texto: celda.regular,
            id_renglon: celda.numrenglon,
            id_columna: 3,
            puntos_max: celda.puntosregular,
          }
          return c;
        });
        const celdasSuficiente = response.data.Renglonesrubrica.map(celda=> {
          const c = {
            id: celda.numrenglon+"4",
            texto: celda.suficiente,
            id_renglon: celda.numrenglon,
            id_columna: 4,
            puntos_max: celda.puntossuficiente,
          }
          return c;
        });

        const celdasInsuficiente = response.data.Renglonesrubrica.map(celda=> {
          const c = {
            id: celda.numrenglon+"5",
            texto: celda.insuficiente,
            id_renglon: celda.numrenglon,
            id_columna: 5,
            puntos_max: celda.puntosinsuficiente,
          }
          return c;
        });

        const celdas=[...celdasExcelente,...celdasBueno,...celdasRegular,...celdasSuficiente,...celdasInsuficiente];
        console.log(celdas)
        this.setState({ celdas:celdas,renglones:renglones },()=>console.log(this.state));
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({
            error: true,
            errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
            errorStatus: 500
          });
          console.log("d")
        } else {
          this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status });
          console.log(error.response.data.message)
        }
      });
    }
    
  }
  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  crearRubrica = () => {
    const rubrica = {
      nombre:this.state.nombre,
      descripcion:this.state.descripcion,
      id_usuario:this.state.id_personal,
      id_carpeta:this.state.id_carpeta
    }

    const renglones = this.state.renglones.map(renglon => {
      const num = renglon.num_renglon;
      const criterio = renglon.criterio;
      const excelente = this.state.celdas.filter((celda) => celda.id_columna == 1 && celda.id_renglon == renglon.num_renglon)[0].texto;
      const bueno = this.state.celdas.filter((celda) => celda.id_columna == 2 && celda.id_renglon == renglon.num_renglon)[0].texto;
      const regular = this.state.celdas.filter((celda) => celda.id_columna == 3 && celda.id_renglon == renglon.num_renglon)[0].texto;
      const suficiente = this.state.celdas.filter((celda) => celda.id_columna == 4 && celda.id_renglon == renglon.num_renglon)[0].texto;
      const insuficiente = this.state.celdas.filter((celda) => celda.id_columna == 5 && celda.id_renglon == renglon.num_renglon)[0].texto;

      const puntosexcelente = this.state.celdas.filter((celda) => celda.id_columna == 1 && celda.id_renglon == renglon.num_renglon)[0].puntos_max;
      const puntosbueno = this.state.celdas.filter((celda) => celda.id_columna == 2 && celda.id_renglon == renglon.num_renglon)[0].puntos_max;
      const puntosregular = this.state.celdas.filter((celda) => celda.id_columna == 3 && celda.id_renglon == renglon.num_renglon)[0].puntos_max;
      const puntossuficiente = this.state.celdas.filter((celda) => celda.id_columna == 4 && celda.id_renglon == renglon.num_renglon)[0].puntos_max;
      const puntosinsuficiente = this.state.celdas.filter((celda) => celda.id_columna == 5 && celda.id_renglon == renglon.num_renglon)[0].puntos_max;

      return {
        numrenglon:num,
        criterio:criterio,
        excelente:excelente,
        bueno:bueno,
        regular:regular,
        suficiente:suficiente,
        insuficiente:insuficiente,
        puntosexcelente:puntosexcelente,
        puntosbueno:puntosbueno,
        puntosregular:puntosregular,
        puntossuficiente:puntossuficiente,
        puntosinsuficiente:puntosinsuficiente
      }
    })
    console.log("Procesando...",rubrica,renglones)
    this.setState({ guardando:true });
    http
    .post("rubrica/crear", {
      Rubrica:rubrica,
      Renglonesrubrica:renglones
    })
    .then((response) => {
      this.setState({ error: true, errorMessage: response.data.message, errorStatus: 201,guardando:false });
      console.log(response.data)
    })
    .catch((error) => {
      if (error.response === undefined) {
        this.setState({
          error: true,
          errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
          errorStatus: 500,
          guardando:false
        });
        console.log("d")
      } else {
        this.setState({ error: true, errorMessage: error.response.data.message, errorStatus: error.response.status,guardando:false });
        console.log(error.response.data.message)
      }
    });
  }


  celdaModificadaHandler = (event, id) => {
    const celdaModificadaIndex = this.state.celdas.findIndex((celda) => celda.id === id);
    let celdasActualizadas = [...this.state.celdas];

    celdasActualizadas[celdaModificadaIndex] = {
      ...celdasActualizadas[celdaModificadaIndex],
      texto: event.target.value
    };

    this.setState({ celdas: celdasActualizadas });
  };
  cabeceraRenglonModificadaHandler = (event, id) => {
    const cabeceraModificadaIndex = this.state.renglones.findIndex(
      (renglon) => renglon.id === id
    );
    let cabecerasActualizadas = [...this.state.renglones];

    cabecerasActualizadas[cabeceraModificadaIndex] = {
      ...cabecerasActualizadas[cabeceraModificadaIndex],
      criterio: event.target.value,
    };

    this.setState({ renglones: cabecerasActualizadas });
  };
  cabeceraColumnaModificadaHandler = (event, id) => {
    const cabeceraModificadaIndex = this.state.columnas.findIndex(
      (columna) => columna.id === id
    );
    let cabecerasActualizadas = [...this.state.columnas];

    cabecerasActualizadas[cabeceraModificadaIndex] = {
      ...cabecerasActualizadas[cabeceraModificadaIndex],
      titulo: event.target.value,
    };

    this.setState({ columnas: cabecerasActualizadas });
  };
  cambioNombreHandler = (event) => {
    this.setState({ nombre: event.target.value });
  };
  cambioDescripcionHandler = (event) => {
    this.setState({ descripcion: event.target.value });
  };

  subirRenglon = (event, num_renglon) => {
    if (num_renglon > 1) {
      const renglonSubir = this.state.renglones.findIndex(
        (renglon) => renglon.num_renglon === num_renglon
      );
      const renglonBajar = this.state.renglones.findIndex(
        (renglon) => renglon.num_renglon === num_renglon - 1
      );

      let renglonesActualizados = [...this.state.renglones];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        num_renglon: num_renglon - 1,
        id: num_renglon - 1
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        num_renglon: num_renglon,
        id: num_renglon
      };

      this.setState({ renglones: renglonesActualizados });
    }
  };
  bajarRenglon = (event, num_renglon) => {
    const cantidadMaxRenglones = this.state.renglones.reduce((max, actual) => {
      return max > actual.num_renglon ? max : actual.num_renglon;
    }, 0);
    console.log(cantidadMaxRenglones);
    if (num_renglon < cantidadMaxRenglones) {
      const renglonSubir = this.state.renglones.findIndex(
        (renglon) => renglon.num_renglon === num_renglon + 1
      );
      const renglonBajar = this.state.renglones.findIndex(
        (renglon) => renglon.num_renglon === num_renglon
      );

      let renglonesActualizados = [...this.state.renglones];
      renglonesActualizados[renglonSubir] = {
        ...renglonesActualizados[renglonSubir],
        num_renglon: num_renglon,
        id: num_renglon
      };
      renglonesActualizados[renglonBajar] = {
        ...renglonesActualizados[renglonBajar],
        num_renglon: num_renglon + 1,
        id: num_renglon +1
      };

      this.setState({ renglones: renglonesActualizados });
    }
  };
  eliminarRenglon = (event, num_renglon) => {
    const cantidadMaxRenglones = this.state.renglones.reduce((max, actual) => {
      return max > actual.num_renglon ? max : actual.num_renglon;
    }, 0);

    if (cantidadMaxRenglones > 1) {
      const renglonEliminado = this.state.renglones.find(
        (renglon) => renglon.num_renglon === num_renglon
      );

      let celdasActualizadas = this.state.celdas.filter(
        (renglon) => renglon.id_renglon !== renglonEliminado.id
      );

      let renglonesActualizados = this.state.renglones.filter(
        (renglon) => renglon.id !== renglonEliminado.id
      );

      const renglonesActualizadosNumRenglon = renglonesActualizados.map(
        (renglon) => {
          if (renglon.num_renglon > num_renglon) {
            return {
              id: renglon.num_renglon - 1,
              criterio: renglon.criterio,
              num_renglon: renglon.num_renglon - 1,
              id_instrumento: renglon.id_instrumento,
            };
          } else {
            return renglon;
          }
        }
      );
      const celdasActualizadasId = celdasActualizadas.map(
        (celda) => {
          //console.log("celda",celda)
          if (celda.id_renglon > num_renglon) {
            return {
              ...celda,
              id_renglon: celda.id_renglon - 1
            };
          } else {
            return celda;
          }
        }
      );

      this.setState({
        renglones: renglonesActualizadosNumRenglon,
        celdas: celdasActualizadasId,
      });
     // console.log(num_renglon, renglonesActualizados, celdasActualizadas);
    }
  };

  agregarRenglon = () => {
    const celdasActualizadas = [...this.state.celdas];
    const renglonesActualizados = [...this.state.renglones];
    const cantidadMaxRenglones = this.state.renglones.reduce((max, actual) => {
      return max > actual.num_renglon ? max : actual.num_renglon;
    }, 0);

    const id = cantidadMaxRenglones + 1/*Math.floor(Math.random() * (900000 - 100000)) + 100000*/;
    renglonesActualizados.push({
      id: id,
      criterio: "Agrega Criterio",
      num_renglon: id,
      id_instrumento: this.state.renglones[0].id_instrumento,
    });

    this.state.columnas.forEach((columna) => {
      const idCelda = Math.floor(Math.random() * (900000 - 100000)) + 100000;
      celdasActualizadas.push({
        id: idCelda,
        texto: "",
        id_renglon: id,
        id_columna: columna.id,
        puntos_max: 50,
      });
    });

   // console.log(renglonesActualizados, celdasActualizadas);
    this.setState({
      renglones: renglonesActualizados,
      celdas: celdasActualizadas,
    });
  };

  cambioNumber = (event, celdaID) => {
    const celdaIndex = this.state.celdas.findIndex(
      (celda) => celda.id === celdaID
    );

    let celdasActualizadas = [...this.state.celdas];
    celdasActualizadas[celdaIndex] = {
      ...celdasActualizadas[celdaIndex],
      puntos_max: event.target.value,
    };

    this.setState({
      celdas: celdasActualizadas,
    });
  };

  render() {
    const columnas = this.state.columnas.map((columna) => {
      const celdas = [];
      for (let i = 0; i < this.state.renglones.length; i++) {
        const a = this.state.celdas.find((celda) => {
          const renglon = this.state.renglones.filter(
            (renglon) => renglon.id === celda.id_renglon 
          );
          return (
            celda.id_columna === columna.id && renglon[0].num_renglon === i + 1
          );
        });
        celdas.push(a);
      }

      return (
        <Grid item xs={12} sm key={columna.id}>
          <ColumnaInstrumento
            celdas={celdas}
            cambio={this.celdaModificadaHandler}
            titulo={columna.titulo}
            cambioTitulo={this.cabeceraColumnaModificadaHandler}
            cabeceraId={columna.id}
            cambioNumber={this.cambioNumber}
          />
        </Grid>
      );
    });

    const r = [...this.state.renglones];
    r.sort((a, b) => a.num_renglon - b.num_renglon);
    const cabeceraRenglon = (
      <Grid item xs={12} sm>
        {
          <ColumnaInstrumento
            celdas={r}
            titulo="Criterios"
            cambio={this.cabeceraRenglonModificadaHandler}
            cabecera
            number={0}
          />

        }
        <Box display="flex" justifyContent="center">
          <IconButton onClick={this.agregarRenglon}>
            <AddIcon color="primary" />
          </IconButton>
        </Box>
      </Grid>
    );
    let boton;
      if (!this.state.guardando) {
        boton = (
          <Button variant="contained" color="primary" onClick={this.crearRubrica}>
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
      <Grid container spacing={2}>
        {error}
        <Grid item xs={12}>
          <Typography
            variant="h4"
            color="textPrimary"
            component="p"
            display="block"
          >
            Rubrica
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/*<TopBar
            titulo="Ana Luz Rodriguez Sarabia"
            descripcion="Departamento de Sistemas Computacionales"
          ></TopBar>*/}
          {/*<Typography
            variant="h6"
            color="textPrimary"
            component="p"
            display="block"
          >
            Titulo
          </Typography>*/}
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
        {/*<Grid item xs={12}>
          <Typography
            variant="h6"
            color="textPrimary"
            component="p"
            display="block"
          >
            Descripcion
          </Typography>
        </Grid>*/}
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
          <Grid item xs={1}>
            <ColumnaOpcionesInstrumento
              cantidad={this.state.renglones.reduce((max, actual) => {
                return max > actual.num_renglon ? max : actual.num_renglon;
              }, 0)}
              onClickSubir={this.subirRenglon}
              onClickBajar={this.bajarRenglon}
              onClickEliminar={this.eliminarRenglon}
            />
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={2}>
              {" "}
              {cabeceraRenglon}
              {columnas}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={12}>
          <Grid container >
              <Grid item xs={6} sm={2}>
                <Button variant="outlined" color="primary" onClick={()=> {this.props.history.push("/instrumentos");}}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={6} sm={2}>
                {boton}
              </Grid>
          </Grid>
          
        </Grid>
        {}
      </Grid>
    );
  }
}

export default Rubrica;

import React, { Component } from "react";
import { Grid, Box, Hidden, ButtonGroup } from "@material-ui/core";
import ListaInstrumentos from "../ListaInstrumentos/ListaInstrumentos";
import EventosPanel from "../../components/UI/EventosPanel/EventosPanel";
import FiltrarInstrumentos from "../../components/IDE/FiltrarInstrumentos/FiltrarInstrumentos";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { http } from "shared/http";

class MenuInstrumentos extends Component {
  state = {
    error: false,
    errorMessage: "Ha ocurrido un error, favor de intentarlo más tarde",
    errorStatus: 0,
    instrumentos: [
      {
        id:1,
        nombre: "Rubrica",
        descripcion: "Para exposicion",
        fecha: "06 de septiembre de 2019",
        tipo: "Rubrica",
      },
      {
        id:1,
        nombre: "Lista de cotejo",
        descripcion: "Para ensayo",
        fecha: "07 de septiembre de 2019",
        tipo: "Lista de Cotejo",
      },
      {
        id:1,
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

  modificarInstrumento = (tipo,id) => {
    if(tipo=="Rubrica"){
      this.props.history.push("/rubrica?id="+id);
    }
    if(tipo=="Lista de Cotejo"){
      this.props.history.push("/listacotejo?id="+id);
    }
    if(tipo=="Lista de Observacion"){
      this.props.history.push("/listaobservacion?id="+id);
    }

  }

  eliminarInstrumento = (tipo,id) => {
    let url = "";
    if(tipo=="Rubrica"){
      url = "rubrica/borrarrubrica/"
    }
    if(tipo=="Lista de Cotejo"){
      
    }
    if(tipo=="Lista de Observacion"){
      
    }
    http
    .delete(url+id)
    .then((response) => {
      console.log(response.data.message);
      this.setState()
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
        console.log(error)
      }
    });
  }

  componentDidMount() {
    http
    .get("rubrica/consultarubrica/1")
    .then((response) => {
      console.log(response);
      const rubricas = response.data.Rubrica.map(rubrica => {
        return {
          id:rubrica.id,
          nombre:rubrica.nombre,
          descripcion:rubrica.descripcion,
          fecha:rubrica.created_at,
          tipo:"Rubrica"
        }
      });
      this.setState((prevState,props) => {
        return{
          instrumentos: [...prevState.instrumentos,...rubricas]
        }
      });
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
        console.log(error.response.data.message)
      }
    });
  }
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
                  modificar={this.modificarInstrumento}
                  eliminar={ this.eliminarInstrumento}
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

const mapStateToProps = (state) => {
  return {
      token: state.auth.token,
      userId: state.auth.userId,
      isAuthenticated: state.auth.token !== null,
  };
};


export default connect(mapStateToProps, null)(MenuInstrumentos);

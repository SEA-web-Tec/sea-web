import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { http } from "shared/http";
import { getBase64, updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import {
  Button,
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  IconButton,
  Avatar
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AddCircleTwoTone as AddCircleTwoToneIcon } from "@material-ui/icons";

class Grupo extends Component {
  state = {
    materia_id: 1,
    usuario_id: 1,
    grupo: "A",
    anio: new Date().getFullYear(),
    periodo: "ENE-JUN",
    fotoPortada: ""
  };

  componentDidMount() {
    this.props.onFetchMaterias(this.props.token);
    this.props.onFetchUsers(this.props.token);
    this.props.onFetchAllGrupos(this.props.token);
  }

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  handleFileSelected = (event, prop) => {
    if (event.target.files.length > 0) {
      getBase64(event.target.files[0]).then((data) => {
        this.setState({ [prop]: data.toString() });
      });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    http
      .post(
        "/grupos/crear",
        {
          materia_id: this.state.materia_id,
          usuario_id: this.state.usuario_id,
          grupo: this.state.grupo,
          anio: this.state.anio,
          periodo: this.state.periodo,
          fotoPortada: this.state.fotoPortada
        },
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }
      )
      .then((response) => {
        this.props.onFetchAllGrupos(this.props.token);
        console.log(response);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <div className={classes.formContainer}>
          <h2>Registro de grupo nuevo</h2>
          <form className={classes.form} onSubmit={this.submitHandler}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <Badge
                overlap="rectangle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={
                  <Fragment>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="fotoPortada"
                      type="file"
                      onChange={(e) => this.handleFileSelected(e, "fotoPortada")}
                    />
                    <label htmlFor="fotoPortada">
                      <IconButton color="secondary" size="small" className={classes.badgeIcon} component="span">
                        <AddCircleTwoToneIcon fontSize="large" />
                      </IconButton>
                    </label>
                  </Fragment>
                }
                className={classes.center}
              >
                <Avatar
                  src={this.state.fotoPortada ? this.state.fotoPortada : undefined}
                  alt="Foto de portada"
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  variant="rounded"
                />
              </Badge>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="materia_idLabel">Materia</InputLabel>
              <Select
                id="materia_id"
                name="materia_id"
                value={this.state.materia_id}
                onChange={this.inputChangedHandler("materia_id")}
                labelId="materia_idLabel"
                label="Materia"
              >
                {this.props.materias.map((materia) => (
                  <MenuItem key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="usuario_idLabel">Profesor</InputLabel>
              <Select
                id="usuario_id"
                name="usuario_id"
                value={this.state.usuario_id}
                onChange={this.inputChangedHandler("usuario_id")}
                labelId="usuario_idLabel"
                label="Profesor"
              >
                {this.props.users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="grupo"
              name="grupo"
              label="Grupo"
              value={this.state.grupo}
              onChange={this.inputChangedHandler("grupo")}
            />
            <FormControl required fullWidth margin="normal" variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  views={["year"]}
                  label="Año"
                  value={new Date(this.state.anio, 0)}
                  onChange={(date) => this.setState({ anio: date.getFullYear() })}
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl required fullWidth margin="normal" variant="outlined">
              <InputLabel id="periodoLabel">Periodo</InputLabel>
              <Select
                id="periodo"
                name="periodo"
                value={this.state.periodo}
                onChange={this.inputChangedHandler("periodo")}
                labelId="periodoLabel"
                label="Periodo"
              >
                <MenuItem value={"ENE-JUN"}>ENE-JUN</MenuItem>
                <MenuItem value={"AGO-DIC"}>AGO-DIC</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" width="100%" marginTop={1}></Box>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} size="large">
              Crear grupo
            </Button>
          </form>
          <Divider style={{ width: "100%", margin: "16px 0" }} variant="middle" />
          <Box width="100%">
            <h2 style={{ textAlign: "center" }}>Grupos</h2>
            <List>
              {this.props.grupos.map((grupo) => (
                <ListItem key={grupo.id}>
                  <ListItemText primary={grupo.nombre} secondary={`Grupo: ${grupo.grupo}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token, materias: state.materias.materias, users: state.users.users, grupos: state.grupos.grupos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMaterias: (token) => dispatch(actions.fetchMaterias(token)),
    onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
    onFetchAllGrupos: (token) => dispatch(actions.fetchAllGrupos(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Grupo));

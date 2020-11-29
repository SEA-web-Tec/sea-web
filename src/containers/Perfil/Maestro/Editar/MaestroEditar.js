import React, { Component } from "react";
import { updateObject } from "shared/utility";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, TextField, InputAdornment, IconButton, Badge, Avatar, Typography, Button, Box } from "@material-ui/core";
import {
  Add as AddIcon,
  AddCircleTwoTone as AddCircleTwoToneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@material-ui/icons";
import PerfilPortada from "components/Perfil/PerfilPortada/PerfilPortada";

class MaestroEditar extends Component {
  state = {
    fotoPerfil: "https://source.unsplash.com/random",
    fotoPortada: "https://source.unsplash.com/random",
    nombre: "José Tadeo",
    apellidoPaterno: "Rodriguez",
    apellidoMaterno: "Solano",
    departamentoAcademico: "ISC",
    correo: "tadeo@lapaz.tecnm.mx",
    contrasenia: "123123",
    showPassword: false
  };

  inputChangedHandler = (prop) => (event) => {
    const updatedObject = updateObject(this.state, {
      [prop]: event.target.value
    });
    this.setState(updatedObject);
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.correo, this.state.contrasenia);
  };

  showPasswordHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  render(props) {
    const { classes } = this.props;

    return (
      <PerfilPortada
        fotoPerfil={this.state.fotoPerfil}
        fotoPortada={this.state.fotoPortada}
        departamentoAcademico={this.state.departamentoAcademico}
        nombre={this.state.nombre}
        apellidoPaterno={this.state.apellidoPaterno}
        apellidoMaterno={this.state.apellidoMaterno}
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xd={12} sm={12} md={6} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography component="h6" variant="h6" align="center" gutterBottom>
                Foto de perfil
              </Typography>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={
                  <IconButton color="secondary" size="small" className={classes.badgeIcon}>
                    <AddCircleTwoToneIcon fontSize="large" />
                  </IconButton>
                }
                className={classes.center}
              >
                <Avatar src={this.state.fotoPerfil} alt="Foto de perfil" style={{ width: "200px", height: "200px" }} />
              </Badge>
            </Grid>
            <Grid item xd={12} sm={12} md={6} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography component="h6" variant="h6" align="center" gutterBottom>
                Foto de portada
              </Typography>
              <Badge
                overlap="rectangle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={
                  <IconButton color="secondary" size="small" className={classes.badgeIcon}>
                    <AddCircleTwoToneIcon fontSize="large" />
                  </IconButton>
                }
                className={classes.center}
              >
                <img src={this.state.fotoPortada} width="300px" height="100px" style={{ objectFit: "cover" }} />
              </Badge>
            </Grid>
            <Grid item xd={12} sm={12} md={12}>
              <Typography component="h6" variant="h6" align="center">
                Datos generales
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="correo"
                name="correo"
                label="Correo Electrónico"
                value={this.state.correo}
                onChange={this.inputChangedHandler("correo")}
                type="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="contrasenia"
                name="contrasenia"
                label="Contraseña"
                value={this.state.contrasenia}
                onChange={this.inputChangedHandler("contrasenia")}
                type={this.state.showPassword ? "text" : "password"}
                // error={this.props.error !== null}
                // helperText={this.props.error !== null && this.props.error.code === 400 ? "Contraseña Inválida" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.showPasswordHandler}>
                        {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="repetirContrasenia"
                name="repetirContrasenia"
                label="Repetir Contraseña"
                value={this.state.repetirContrasenia}
                onChange={this.inputChangedHandler("repetirContrasenia")}
                type={this.state.showPassword ? "text" : "password"}
                // error={this.props.error !== null}
                // helperText={this.props.error !== null && this.props.error.code === 400 ? "Contraseña Inválida" : ""}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" padding={2}>
            <Button variant="contained" color="secondary" size="large">
              Guardar Cambios
            </Button>
          </Box>
        </form>
      </PerfilPortada>
    );
  }
}

export default withStyles(useStyles)(MaestroEditar);

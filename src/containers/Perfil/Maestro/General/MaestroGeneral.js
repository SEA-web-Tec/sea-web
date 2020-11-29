import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import {
  AttachMoney as AttachMoneyIcon,
  PermContactCalendar as PermContactCalendarIcon,
  Email as EmailIcon,
  Wc as WcIcon,
  School as SchoolIcon,
  Grade as GradeIcon
} from "@material-ui/icons";
import PerfilPortada from "components/Perfil/PerfilPortada/PerfilPortada";

class MaestroGeneral extends Component {
  state = {
    numEconomico: 154233432,
    correo: "tadeo@lapaz.tecnm.mx",
    rfc: "GAFJ810702NA0",
    curp: "GAFJ810702HOCRRS05",
    cedulaProfesional: "57209534",
    estudios: "Especialidad",
    sexo: "Masculino"
  };

  render(props) {
    const { classes } = this.props;

    return (
      <PerfilPortada
        fotoPerfil="https://source.unsplash.com/random"
        fotoPortada="https://source.unsplash.com/random"
        departamentoAcademico="ISC"
        nombre="José Tadeo"
        apellidoPaterno="Rodriguez"
        apellidoMaterno="Solano"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <EmailIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                Correo Electrónico
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.correo}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <AttachMoneyIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                Número Económico
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.numEconomico}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <PermContactCalendarIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                RFC
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.rfc}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <PermContactCalendarIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                CURP
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.curp}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <GradeIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                Cédula Profesional
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.cedulaProfesional}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <SchoolIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                Estudios
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.estudios}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.infoItem}>
            <Avatar className={classes.infoItemsIcon}>
              <WcIcon style={{ color: "white" }} />
            </Avatar>
            <div>
              <Typography component="h6" variant="h6">
                Sexo
              </Typography>
              <Typography component="p" variant="body2">
                {this.state.sexo}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </PerfilPortada>
    );
  }
}

export default withStyles(useStyles)(MaestroGeneral);

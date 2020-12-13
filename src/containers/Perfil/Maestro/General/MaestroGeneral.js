import React, { Component, Fragment } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions/index";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Avatar, Button, CircularProgress, Grid, Typography } from "@material-ui/core";
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
  componentDidMount() {
    this.props.onFetchPerfil(this.props.token, this.props.user.id);
  }

  render(props) {
    const { classes } = this.props;

    let authRedirect = null;

    // if (this.props.user.id) {
    //   authRedirect = <Redirect to={"/404"} />;
    // }

    let perfil = <CircularProgress className={classes.spinner} />;

    if (!this.props.loading) {
      perfil = (
        <PerfilPortada
          fotoPerfil={this.props.user.fotoPerfil}
          fotoPortada={this.props.user.fotoPortada}
          departamentoAcademico={this.props.user.departamentoAcademico}
          nombres={this.props.user.nombres}
          apellidoPaterno={this.props.user.apellidoPaterno}
          apellidoMaterno={this.props.user.apellidoMaterno}
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
                  {this.props.user.correo}
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
                  {this.props.user.numeroEconomico}
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
                  {this.props.user.rfc}
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
                  {this.props.user.curp}
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
                  {this.props.user.cedulaProfesional}
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
                  {this.props.user.estudios}
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
                  {this.props.user.sexo}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.infoItem}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                component={RouterLink}
                to={`${this.props.history.location.pathname}/editar`}
              >
                Editar perfil
              </Button>
            </Grid>
          </Grid>
        </PerfilPortada>
      );
    }

    return (
      <Fragment>
        {authRedirect}
        {perfil}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    error: state.auth.error,
    hasError: state.auth.hasError,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPerfil: (token, userId) => dispatch(actions.fetchPerfil(token, userId)),
    onPerfilDismissError: () => dispatch(actions.perfilDismissError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MaestroGeneral));

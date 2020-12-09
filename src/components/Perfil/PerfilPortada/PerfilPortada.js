import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Typography, CardMedia, Card, Avatar, CardContent } from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";

class PerfilPortada extends Component {
  render(props) {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <CardMedia
            className={clsx(classes.cardHeaderBG, this.props.fotoPortada && classes.withImage)}
            component="img"
            image={`data:image/jpeg;base64,${this.props.fotoPortada}`}
          />
          <div className={classes.cardHeaderContent}>
            <Avatar
              src={`data:image/jpeg;base64,${this.props.fotoPerfil}`}
              alt={this.props.nombre}
              className={classes.fotoPerfil}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <div>
              <Typography component="h5" variant="h5" noWrap gutterBottom>
                {`${this.props.nombres} ${this.props.apellidoPaterno} ${this.props.apellidoMaterno}`}
              </Typography>
              <Typography component="p" variant="overline" style={{ lineHeight: "16px" }}>
                {this.props.departamentoAcademico}
              </Typography>
            </div>
          </div>
        </div>
        <CardContent className={clsx(this.props.hasTabs && classes.hasTabs)}>{this.props.children}</CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(PerfilPortada);

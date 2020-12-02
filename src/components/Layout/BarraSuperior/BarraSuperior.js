import React, { useCallback, useEffect } from "react";
import clsx from "clsx";

import { useStyles } from "./Styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import MoreVert from "@material-ui/icons/MoreVert";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/actions/index";

const BarraSuperior = (props) => {
  const classes = useStyles();

  // const auth = useSelector((state) => state.auth);
  // const grupos = useSelector((state) => state.curso.cursos);

  // let token, userId;

  // token = auth.token;
  // userId = auth.userId;

  // const fotoPerfil = grupos === undefined || grupos.length === 0 ? null : grupos[0].fotoPerfil;

  const dispatch = useDispatch();

  // UseCallback() es recomendado para evitar renderizado innecesario
  const toggleDarkMode = useCallback(() => dispatch(actions.toggleDarkMode()), [dispatch]);
  // const onFetchGrupos = useCallback(
  //     (token, userId) => dispatch(actions.fetchCursos(token, userId)),
  //     [dispatch]
  // );

  // const fetchGrupos = () => {
  //     onFetchGrupos(token, userId);
  // };

  // //ComponentDidMount
  // useEffect(fetchGrupos, [onFetchGrupos, token, userId]);

  return (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" aria-label="open drawer" onClick={props.toggleDrawer} edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.titulo}>
          {props.titulo}
        </Typography>
        <div className={classes.opciones}>
          <IconButton>
            <Avatar src={""} />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            <Brightness2Icon />
          </IconButton>
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
  return null;
};

export default BarraSuperior;

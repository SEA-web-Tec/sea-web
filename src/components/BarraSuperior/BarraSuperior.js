import React, { useCallback, useEffect } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
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

export const minHeight = 56;

const BarraSuperior = (props) => {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        titulo: {
            marginLeft: 36,
        },
        toolbar: {
            paddingRight: "0px",
        },
        opciones: {
            width: "fit-content",
            flex: 1,
            textAlign: "right",
            marginRight: "16px",
        },
    }));

    const auth = useSelector((state) => state.auth);
    const grupos = useSelector((state) => state.curso.cursos);
    let token, userId;
    token = auth.token;
    userId = auth.userId;
    const fotoPerfil =
        grupos === undefined || grupos.length === 0
            ? null
            : grupos[0].fotoPerfil;

    //ComponentDidMount
    useEffect(() => {
        onFetchGrupos(token, userId);
    }, []);

    const dispatch = useDispatch();
    const classes = useStyles();

    // UseCallback() es recomendado para evitar renderizado innecesario
    const toggleDarkMode = useCallback(
        () => dispatch(actions.toggleDarkMode()),
        [dispatch]
    );
    const onFetchGrupos = useCallback(
        (token, userId) => dispatch(actions.fetchCursos(token, userId)),
        [dispatch]
    );

    return (
        <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDrawer}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.titulo}>
                    {props.titulo}
                </Typography>
                <div className={classes.opciones}>
                    <IconButton>
                        <Avatar src={fotoPerfil} />
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
};

export default BarraSuperior;

import React, { useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useDispatch } from "react-redux";
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

    const classes = useStyles();

    const dispatch = useDispatch();

    // UseCallback() es recomendado para evitar renderizado innecesario
    const toggleDarkMode = useCallback(
        () => dispatch(actions.toggleDarkMode()),
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
                    className={clsx(classes.menuButton)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.titulo}>
                    {props.titulo}
                </Typography>
                <div className={classes.opciones}>
                    <IconButton
                        color="inherit"
                        onClick={toggleDarkMode}
                        className={classes.menuButton}
                    >
                        <Brightness2Icon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default BarraSuperior;

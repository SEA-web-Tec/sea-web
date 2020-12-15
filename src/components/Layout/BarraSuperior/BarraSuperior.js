import React, { useCallback, Fragment } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import { useStyles } from "./Styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import * as actions from "store/actions/index";
import TituloRuta from "shared/titulosRutas";

const BarraSuperior = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const fotoPerfil = useSelector((state) => state.auth.user.fotoPerfil);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const location = useLocation();
    const titulo = TituloRuta(location.pathname);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const dispatch = useDispatch();
    // UseCallback() es recomendado para evitar renderizado innecesario
    const toggleDarkMode = useCallback(
        () => dispatch(actions.toggleDarkMode()),
        [dispatch]
    );
    const menuVertical = (
        <Fragment>
            <IconButton
                color="inherit"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={() => handleToggle()}
            >
                <MoreVertIcon />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            history.push("/logout");
                                        }}
                                    >
                                        Cerrar sesión
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
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
                    {titulo}
                </Typography>
                <div className={classes.opciones}>
                    <IconButton
                        onClick={() => {
                            history.push("/perfil");
                        }}
                    >
                        <Avatar src={fotoPerfil} />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleDarkMode}>
                        <Brightness2Icon />
                    </IconButton>
                    {menuVertical}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default BarraSuperior;

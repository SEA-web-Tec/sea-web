import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import clsx from "clsx";

import Backdrop from "@material-ui/core/Backdrop";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import * as Colores from "@material-ui/core/colors";

import HomeIcon from "@material-ui/icons/Home";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SadIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SchoolIcon from "@material-ui/icons/School";

import SideItem from "components/SideItem/SideItem";
import { useStyles } from "./Styles";

const BarraIzquierda = (props) => {
    const classes = useStyles();

    const user = useSelector((state) => state.auth.user);
    const userType = user.userType;

    let grupos = useSelector((state) => state.grupos.grupos).filter(
        (grupo) => grupo.usuario_id === user.id
    );

    const history = useHistory();

    const nombresColores = Object.keys(Colores);
    const despliegueGrupos =
        grupos.length > 0 ? (
            grupos.map((grupo, index) => {
                const texto = grupo.nombre;
                const letra = texto.charAt(0).toUpperCase();
                return (
                    <SideItem key={index + 1} text={texto}>
                        <Avatar
                            style={{
                                backgroundColor:
                                    Colores[
                                        nombresColores[(index + 2) % 100]
                                    ][400],
                                color: "#FFF",
                            }}
                            className={classes.Avatar}
                        >
                            {letra}
                        </Avatar>
                    </SideItem>
                );
            })
        ) : (
            <SideItem text="Sin grupos asignados">
                <SadIcon></SadIcon>
            </SideItem>
        );
    const opcionesAdmin =
        userType === 1 ? (
            <Fragment>
                <List>
                    <SideItem
                        text="Agregar Materias"
                        clicked={() => {
                            history.push("/admin/materias");
                        }}
                    >
                        <MenuBookIcon />
                    </SideItem>
                    <SideItem
                        text="Instrumentaciones"
                        clicked={() => {
                            history.push("/instrumentacion/evaluar");
                        }}
                    >
                        <SchoolIcon />
                    </SideItem>
                </List>
                <Divider />
            </Fragment>
        ) : null;

    return (
        <Fragment>
            <Backdrop
                className={clsx(classes.backdrop)}
                open={props.open}
                onClick={props.closed}
            />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: props.open,
                        [classes.drawerClose]: !props.open,
                    }),
                }}
            >
                <List>
                    <SideItem
                        selected
                        clicked={() => {
                            history.push("/grupos");
                        }}
                        text="Grupos"
                    >
                        <HomeIcon />
                    </SideItem>
                    <SideItem text="Calendario">
                        <CalendarIcon />
                    </SideItem>
                    <SideItem text="Notificaciones">
                        <NotificationsIcon />
                    </SideItem>
                </List>
                <Divider />
                <List>{despliegueGrupos}</List>
                <Divider />
                {opcionesAdmin}
                <List>
                    <SideItem text="Configuración">
                        <SettingsIcon />
                    </SideItem>
                    <SideItem text="Ayuda">
                        <HelpIcon />
                    </SideItem>
                </List>
            </Drawer>
        </Fragment>
    );
};

export default BarraIzquierda;

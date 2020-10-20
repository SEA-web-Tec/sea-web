import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import clsx from "clsx";

import Backdrop from "@material-ui/core/Backdrop";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import HomeIcon from "@material-ui/icons/Home";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";

import Avatar from "@material-ui/core/Avatar";
import SideItem from "../SideItem/SideItem";
import * as Colores from "@material-ui/core/colors";
import { useStyles } from "./Styles";

const BarraIzquierda = (props) => {
    const classes = useStyles();

    const grupos = [
        {
            nombre: "Programación Web",
            color: "#673ab7",
        },
        {
            nombre: "Ingeniería de Software",
            color: "#3f51b5",
        },
        {
            nombre: "Redes de Computadoras",
            color: "#d500f9",
        },
    ];

    const history = useHistory();

    const nombresColores = Object.keys(Colores);

    console.log();

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
                    <SideItem  text="Calendario">
                        <CalendarIcon />
                    </SideItem>
                    <SideItem text="Notificaciones">
                        <NotificationsIcon />
                    </SideItem>
                    <SideItem
                        text="Instrumentación didáctica"
                        clicked={() => {
                            history.push("/instrumentacion");
                        }}
                    >
                        <CalendarIcon />
                    </SideItem>
                    <SideItem
                        text="Instrumentos"
                        clicked={() => {
                            history.push("/instrumentos");
                        }}
                    >
                        <CalendarIcon />
                    </SideItem>
                    <SideItem
                        text="Rúbrica"
                        clicked={() => {
                            history.push("/rubrica");
                        }}
                    >
                        <CalendarIcon />
                    </SideItem>
                </List>
                <Divider />
                <List>
                    {grupos.map((grupo, index) => {
                        const texto = grupo.nombre;
                        const letra = texto.charAt(0).toUpperCase();
                        return (
                            <SideItem key={texto} text={texto}>
                                <Avatar
                                    style={{
                                        backgroundColor: Colores[nombresColores[index+2]][400],
                                        color: "#FFF"
                                    }}
                                    className={classes.Avatar}
                                >
                                    {letra}
                                </Avatar>
                            </SideItem>
                        );
                    })}
                </List>
                <Divider />
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

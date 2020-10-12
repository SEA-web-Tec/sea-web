import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import HomeIcon from "@material-ui/icons/Home";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";

import SideItem from "../SideItem/SideItem";
import LetterIcon from "../LetterIcon/LetterIcon";

const width = 256;

const BarraIzquierda = (props) => {
  const marginTop = props.marginTop;

  const useStyles = makeStyles((theme) => {
    return {
      backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: "#fff"
      },
      drawer: {
        zIndex: theme.zIndex.drawer,
        width: width,
        marginRight: 0,
        flexShrink: 0,
        whiteSpace: "nowrap"
      },
      drawerOpen: {
        top: marginTop,
        width: width,
        position: "fixed",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        }),
        [theme.breakpoints.up("sm")]: {
          top: 64
        }
      },
      drawerClose: {
        top: 64,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        position: "fixed",
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.down("xs")]: {
          display: "none",
          top: marginTop
        }
      }
    };
  });
  const classes = useStyles();

  const grupos = [
    {
      nombre: "Programación Web",
      color: "#673ab7"
    },
    {
      nombre: "Ingeniería de Software",
      color: "#3f51b5"
    },
    {
      nombre: "Redes de Computadoras",
      color: "#d500f9"
    }
  ];

  const history = useHistory();

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
          [classes.drawerClose]: !props.open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open
          })
        }}
      >
        <List>
          <SideItem
            selected
            clicked={() => {
              history.push("/grupos");
            }}
            text="Inicio"
          >
            <HomeIcon />
          </SideItem>
          <SideItem text="Calendario">
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
              <SideItem key={texto} letter text={texto}>
                <LetterIcon fill={grupo.color} letter={letra} />
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

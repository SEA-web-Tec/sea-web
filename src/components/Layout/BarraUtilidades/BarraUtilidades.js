import React from "react";
import Drawer from "@material-ui/core/Drawer";

import EventosPanel from "components/UI/EventosPanel/EventosPanel";
import CalendarioEventos from "components/UI/CalendarioEventos/CalendarioEventos";
import { useStyles } from "./Styles";

const BarraUtilidades = (props) => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="right"
        >
            <CalendarioEventos></CalendarioEventos>
            <EventosPanel></EventosPanel>
        </Drawer>
    );
};

export default BarraUtilidades;

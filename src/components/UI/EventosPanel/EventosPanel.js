import React, { Component } from "react";
import PanelExpansible from "../PanelExpansible/PanelExpnasible";
import { List, ListItem, ListItemText,ListItemIcon } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

class EventosPanel extends Component {
  state = {
    eventos: [
      {
        nombre: "Practica 1",
        fecha: "Mañana",
        hora: "18:00",
      },
      {
        nombre: "Proyecto",
        fecha: "Jueves",
        hora: "09:00",
      },
    ],
  };

  render() {
    const body = this.state.eventos.map((evento, index) => (
      <React.Fragment key={index}>
        <ListItem button>
          <ListItemIcon>
            <AccessTimeIcon/>
          </ListItemIcon>
          <ListItemText>{evento.hora} - {evento.nombre}</ListItemText>
          
        </ListItem>
      </React.Fragment>
    ));
    return (
      <div>
        <PanelExpansible titulo="Mis eventos proximos">
          <List>{body}</List>
        </PanelExpansible>
      </div>
    );
  }
}


export default EventosPanel;

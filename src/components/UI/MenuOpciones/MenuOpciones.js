import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";


export default function MenuOpciones(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /*const opciones = props.opciones.map(op => {
  <MenuItem onClick={op["onClick"]}>{op["nombre"]}</MenuItem>
    
  });*/

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Crear</MenuItem>
        <MenuItem onClick={handleClose}>Modificar</MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose}>Elminar</MenuItem> */}
        {props.children}
      </Menu>
    </div>
  );
}
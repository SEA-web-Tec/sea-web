import React from "react";
import { Typography, TextField, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./ListItem.styles";

const ListItemEdit = (props) => {
    const classes = useStyles();
    var iconSelected = "";
    var styleSelected = "";
    if (props.icon === true) {
        styleSelected = classes.addCircle;
        iconSelected = <AddCircleIcon onClick={props.create} />;
    } else {
        styleSelected = classes.addCancel;
        iconSelected = <CancelIcon onClick={props.delete} />;
    }
    return (
        <div className={classes.ListItem}>
            <div className={classes.Label}>
                <Typography>{props.label}</Typography>
            </div>
            <div className={classes.Content}>
                <TextField
                    type="text"
                    color="secondary"
                    multiline={true}
                    fullWidth={true}
                    placeholder={props.Actividad}
                />
                <IconButton className={styleSelected}>
                    {iconSelected}
                </IconButton>
            </div>
        </div>
    );
};

export default ListItemEdit;

import React from "react";
import { useStyles } from "./Styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

const SideItem = (props) => {
    const classes = useStyles();

    return (
        <ListItem
            className={clsx(
                classes.IconBox,
                props.selected ? classes.SelectedItem : null
            )}
            selected={props.selected}
            button={props.button === undefined ? true : props.button}
            key={props.text}
            onClick={props.clicked}
        >
            <ListItemIcon
                className={clsx(
                    classes.IconBox,
                    props.selected ? classes.SelectedIconBox : null
                )}
            >
                <div>{props.children}</div>
            </ListItemIcon>
            <ListItemText
                primary={props.text}
                className={clsx(
                    classes.Text,
                    props.selected ? classes.SelectedText : null
                )}
            />
        </ListItem>
    );
};

export default SideItem;

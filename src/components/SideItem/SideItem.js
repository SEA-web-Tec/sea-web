import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

const selectedColor = "#3f51b5";

const SideItem = (props) => {
    const useStyles = makeStyles((theme) => {
        return {
            Text: {
                marginLeft: "-4px",
                "& span": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },
            },
            SelectedText: {
                color: selectedColor,
                "& span": {
                    fontWeight: "bold",
                },
            },
            SelectedIconBox: {
                "& div": {
                    color: selectedColor,
                },
            },
            IconBox: {},
        };
    });

    const classes = useStyles();

    return (
        <ListItem
            selected={props.selected}
            button={props.button === undefined ? true: props.button}
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

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
            SelectedItem: {
                backdropFilter:
                    theme.palette.type === "light"
                        ? "brightness(100%)"
                        : "brightness(130%)",
            },
            SelectedText: {
                color:
                    theme.palette.type === "light"
                        ? theme.palette.primary.main
                        : theme.palette.common.white,
                "& span": {
                    fontWeight: theme.palette.type === "light"
                    ? "bold"
                    : "900",
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                },
            },
            SelectedIconBox: {
                "& div": {
                    color: theme.palette.type === "light"
                    ? theme.palette.primary.main
                    : theme.palette.common.white,
                },
            },
        };
    });

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

import { makeStyles } from "@material-ui/core";

const expandedWidth = 286; // valor albitrario. Solo jugué con los tamaños y ese gustó.
const marginTop = 64; // es igual a la altura del Appbar superior, definida en el estándar de Material-UI.

export const useStyles = makeStyles((theme) => {
    return {
        backdrop: {
            zIndex: theme.zIndex.drawer - 1,
            color: theme.palette.background.default,
        },
        drawer: {
            zIndex: theme.zIndex.drawer,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            top: marginTop,
            width: expandedWidth,
            position: "fixed",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up("sm")]: {
                top: marginTop,
            },
        },
        drawerClose: {
            top: marginTop,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            position: "fixed",
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
        Avatar: {
            marginLeft: "-8px",
        },
    };
});

import { makeStyles } from "@material-ui/core";

const width = 286;
const marginTop = 64;

export const useStyles = makeStyles((theme) => {
    return {
        backdrop: {
            zIndex: theme.zIndex.drawer - 1,
            color: theme.palette.background.default,
        },
        drawer: {
            zIndex: theme.zIndex.drawer,
            width: width,
            marginRight: 0,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            top: marginTop,
            width: width,
            position: "fixed",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up("sm")]: {
                top: 64,
            },
        },
        drawerClose: {
            top: 64,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            position: "fixed",
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.down("xs")]: {
                display: "none",
                top: marginTop,
            },
        },
        Avatar: {
            marginLeft: "-8px",
        },
    };
});

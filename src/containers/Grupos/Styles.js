import { width as right } from "components/Layout/BarraUtilidades/Styles";

export const useStyles = (theme) => ({
    spinner: {
        display: "block",
        margin: "60px auto",
        width: "60px !important",
        height: "60px !important",
    },
    speedDial: {
        position: "absolute",
        "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
            bottom: theme.spacing(4),
            right: right + theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
                right: theme.spacing(4),
            },
        },
        "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});

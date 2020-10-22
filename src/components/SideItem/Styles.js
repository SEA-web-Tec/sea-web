import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
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
                fontSize: "1.07rem",
                letterSpacing: "0.03em",
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
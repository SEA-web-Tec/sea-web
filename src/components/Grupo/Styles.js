import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    avatar: {
        position: "absolute",
        right: theme.spacing(2),
        top: theme.spacing(-6),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    box: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 2),
    },
    card: {
        display: "flex",
        flexDirection: "column",
    },
    cardHeader: {
        position: "relative",
        height: "130px",
        overflow: "hidden",
    },
    cardMedia: {
        filter: "blur(4px) brightness(60%)",
        position: "absolute",
        width: "105%",
        height: "110%",
        margin: "-5px",
    },
    cardContent: {
        position: "relative",
        flexGrow: 1,
    },
    cardActions: {
        justifyContent: "space-between",
        padding: theme.spacing(1, 2),
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    optionsButton: {
        color: "white",
        float: "right",
        margin: theme.spacing(1),
    },
    horario: {
        padding: theme.spacing(0, 2, 1, 2),
    },
    alarma: {
        marginRight: "18px",
        marginLeft: "8px",
    },
    letra: {
        color: "white",
        top: "8px",
        left: "16px",
        position: "absolute",
        fontSize: "69px"
    },
}));

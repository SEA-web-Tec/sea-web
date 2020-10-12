export const useStyles = (theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30vh",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            marginTop: "22vh",
            "& button": {
                width: "100%",
            },
        },
    },
});

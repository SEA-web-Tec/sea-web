export const useStyles = (theme) => ({
  titulo: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1)
    }
  },
  examenList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: -1,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  }
});

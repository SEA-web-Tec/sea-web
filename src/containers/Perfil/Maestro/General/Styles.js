export const useStyles = (theme) => ({
  infoItem: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center"
    }
  },
  infoItemsIcon: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1)
  },
  spinner: {
    display: "block",
    margin: "60px auto",
    width: "60px !important",
    height: "60px !important"
  }
});

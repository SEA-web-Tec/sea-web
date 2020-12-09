export const useStyles = (theme) => ({
  center: {
    margin: "auto"
  },
  badgeIcon: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    }
  },
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
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  },
  spinner: {
    display: "block",
    margin: "60px auto",
    width: "60px !important",
    height: "60px !important"
  }
});

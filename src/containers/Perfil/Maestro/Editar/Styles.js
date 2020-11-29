import { FullscreenExit } from "@material-ui/icons";

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
  }
});

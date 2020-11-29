import { FullscreenExit } from "@material-ui/icons";

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
  }
});

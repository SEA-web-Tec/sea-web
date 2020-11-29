import { green } from "@material-ui/core/colors";

export const useStyles = (theme) => ({
  card: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0"
    }
  },
  cardHeader: {
    position: "relative",
    height: "112px",
    [theme.breakpoints.down("xs")]: {
      height: "192px"
    },
    overflow: "hidden"
  },
  cardHeaderBG: {
    position: "absolute",
    width: "105%",
    height: "110%",
    margin: "-5px",
    backgroundColor: theme.palette.primary.main
  },
  withImage: {
    filter: "blur(4px) brightness(40%)"
  },
  cardHeaderContent: {
    color: "#FFF",
    position: "absolute",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(4),
      textAlign: "center"
    }
  },
  cardHeaderDetails: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1)
    }
  },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  hasTabs: {
    padding: 0
  },
  fotoPerfil: {
    marginRight: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 0, 2)
    }
  }
});

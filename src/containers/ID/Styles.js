import { green } from "@material-ui/core/colors";

export const useStyles = (theme) => ({
  card: {
    margin: theme.spacing(2),
    // height: "500px", // Temporal
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0),
      borderRadius: "0"
    }
  },
  cardHeader: {
    position: "relative",
    height: "129px",
    [theme.breakpoints.down("xs")]: {
      height: "189px"
    },
    overflow: "hidden"
  },
  cardContent: {
    padding: 0
  },
  headerBG: {
    filter: "blur(4px) brightness(60%)",
    position: "absolute",
    width: "105%",
    height: "110%",
    margin: "-5px"
  },
  headerInfo: {
    color: "#FFF",
    position: "absolute",
    padding: theme.spacing(2)
  },
  subGrid: {
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
  statusBox: {
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "31px"
    }
  },
  grupoPeriodoBox: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1)
    }
  },
  grupoPeriodoItemBox: {
    marginLeft: theme.spacing(1)
  },
  grupoPeriodoMobileBox: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start"
    }
  },
  grupoPeriodoMobileItemBox: {
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1)
    }
  },
  checkIcon: {
    color: green[600],
    margin: theme.spacing(0, 0, 0, 1)
  }
});

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "initial",
    [theme.breakpoints.down("xs")]: {
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
  cardHeaderBG: {
    filter: "blur(4px) brightness(40%)",
    position: "absolute",
    width: "105%",
    height: "110%",
    margin: "-5px"
  },
  cardHeaderContent: {
    color: "#FFF",
    position: "absolute",
    padding: theme.spacing(2)
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
  statusBox: {
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "31px"
    }
  },
  abiertaIcon: {
    color: theme.palette.grey[500],
    margin: theme.spacing(0, 0, 0, 1)
  },
  entregadaIcon: {
    color: theme.palette.info.main,
    margin: theme.spacing(0, 0, 0, 1)
  },
  aprobadaIcon: {
    color: theme.palette.success.main,
    margin: theme.spacing(0, 0, 0, 1)
  },
  rechazadaIcon: {
    color: theme.palette.error.main,
    margin: theme.spacing(0, 0, 0, 1)
  },
  hasTabs: {
    padding: 0
  },
  spinner: {
    display: "block",
    margin: "60px auto",
    width: "60px !important",
    height: "60px !important"
  }
}));

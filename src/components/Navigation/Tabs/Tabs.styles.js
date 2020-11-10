import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    //marginBottom: 100,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  titulo: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1),
    },
  },
  semanas: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      margin: theme.spacing(1.5, 0),
    },
  },
  semanasChip: {
    "&:last-child": {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  contentGrid: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0),
    },
  },
  expanderFeedback: {
    marginLeft: "auto",
    padding: 5,
    marginRight: 5,
  },
  avatarSize: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  selectSize: {
    display: "flex",
  },
  addCircle: {
    color: theme.palette.secondary.main,
    marginLeft: "auto",
    padding: 5,
  },
}));

export default useStyles;

import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0",
    },
  },
  root: {
    minWidth: 275,
    marginBottom: "1%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  ListItem: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginBottom: theme.spacing(1),
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  Label: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
  },
  Content: {
    backgroundColor: "#DDD",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    width: "100%",
  },
  addCircle: {
    color: theme.palette.secondary.main,
    marginLeft: "auto",
    padding: 5,
  },
  addCancel: {
    color: red[600],
    marginLeft: "auto",
    padding: 5,
  },
  iconCircle: {
    fontSize: "large",
  },
}));

export default useStyles;

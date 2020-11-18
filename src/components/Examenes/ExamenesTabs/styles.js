import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    margin: theme.spacing(2),
    minWidth: "240px",
    width: "calc(100% - 32px)"
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1)
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "240px",
    width: "calc(100% - 30px)"
  },
  chip: {
    "&:last-child": {
      marginLeft: theme.spacing(2),
    },
    minWidth: "240px",
    width: "calc(100% - 24px)",
    justifyContent: "left"
  },
  fullWidth: { width: "100%" },
  contentIcons: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  iconEdit: { color: "#3D978D" },
  iconDelete: { color: "#DF042F" },
  text: {
    width: "calc(100% - 24px)",
    overflow: "hidden"
  },
  center: { 
    display: "flex", 
    margin: theme.spacing(4, 0, 1, 0), 
    justifyContent: "center" 
  }
}));

export default useStyles;
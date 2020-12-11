import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  selectSize: {
    width: 100,
  },
  addCancel: {
    color: red[600],
    marginLeft: "auto",
    padding: 5,
  },
}));

export default useStyles;

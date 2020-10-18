import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titulo: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1),
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
  avatarSize: {
    width: theme.spacing(6.5),
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
  },
  auto: {
    autoWidth: true,
  },
}));

export default useStyles;

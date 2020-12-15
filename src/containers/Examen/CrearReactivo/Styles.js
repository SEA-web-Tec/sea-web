export const useStyles = (theme) => ({
  title: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1)
    }
  },
  required: {
    color: theme.palette.error.light
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: "240px",
    width: "calc(100% - 32px)"
  },
  center: { display: "flex", margin: theme.spacing(4, 0, 1, 0), justifyContent: "center" },
  form: {
    marginTop: theme.spacing(1)
  }
});

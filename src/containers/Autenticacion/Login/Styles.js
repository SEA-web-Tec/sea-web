export const useStyles = (theme) => ({
  formContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0)
  },
  spinner: {
    display: "block",
    margin: "60px auto",
    width: "60px !important",
    height: "60px !important"
  }
});

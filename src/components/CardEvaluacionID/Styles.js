export const useStyles = (theme) => ({
  root: {
    minWidth: 275,
    marginBottom: "1%",
    height: 210,
    overflowY: "scroll",
  },
  addHover: {
    cursor:"pointer",
    "&:hover": {
      filter: "brightness(80%)",
    },
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
    border: 1,
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
});
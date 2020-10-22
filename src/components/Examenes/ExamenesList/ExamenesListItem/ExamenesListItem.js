import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AssignmentTurnedIn as AssignmentTurnedInIcon, MoreVert as MoreVertIcon } from "@material-ui/icons";
import {
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main
  },
  pending: {
    backgroundColor: theme.palette.warning.main
  }
}));

function ExamenesListItem(props) {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={props.done ? classes.success : classes.pending}>
          <AssignmentTurnedInIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Diagnóstico"
        secondary={
          <Grid container spacing={1}>
            <Grid item>
              <Chip size="small" label="Estado" />
            </Grid>
            <Grid item>
              <Chip size="small" label="Fecha" />
            </Grid>
            <Grid item>
              <Chip size="small" label="Grupo" />
            </Grid>
          </Grid>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ExamenesListItem;

import React from "react";
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
  Success: {
    backgroundColor: theme.palette.success.main
  },
  Pending: {
    backgroundColor: theme.palette.warning.main
  }
}));

function ExamenesListItem(props) {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={props.terminado ? classes.Success : classes.Pending}>
          <AssignmentTurnedInIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.titulo}
        secondary={
          <Grid container spacing={1}>
            <Grid item>
              <Chip size="small" label={`Grupos: ${props.grupo}`} />
            </Grid>
            <Grid item>
              <Chip size="small" label={`Estado: ${props.estado}`} />
            </Grid>
            <Grid item>
              <Chip size="small" label={`Fecha: ${props.fecha}`} />
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  GroupAdd as GroupAddIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";
import { Accordion, AccordionSummary, Box, Typography, IconButton, AccordionDetails } from "@material-ui/core";
import ExamenesList from "../ExamenesList/ExamenesList";

const useStyles = makeStyles((theme) => ({
  ExamenesAccordion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  }
}));

const ExamenesAccordion = (props) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box component="div" className={classes.ExamenesAccordion}>
          <Box component="div">
            <Typography>{props.nombreExamen}</Typography>
          </Box>
          <Box component="div">
            <IconButton color="secondary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="secondary">
              <CreateIcon />
            </IconButton>
            <IconButton color="secondary">
              <GroupAddIcon />
            </IconButton>
            <IconButton color="secondary">
              <GetAppIcon />
            </IconButton>
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <ExamenesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default ExamenesAccordion;

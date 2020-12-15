import React from "react";
import useStyles from "./styles";
import { Grid, FormControl, IconButton, Chip, Box, Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

export default function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;
  let x = 0;

  const handleDelete = () => {
    console.info('You clicked the Chip to delete it.');
  };

  const handleClick = () => { // según el tipo de reactivo: abierto - f/v - múltiple
    console.info('You clicked the Chip to edit it.');
  };

  console.log("TabsPanel: "+props.reactivos);
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      <br/>
      {props.reactivos.map((reactivo) => {
        console.log(reactivo);
        return (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl className={classes.formControl}>
              <Chip className={classes.chip} classes={{label:classes.fullWidth}} key={x++} label={ 
                <div className={classes.contentIcons}>
                  <p className={classes.text}>{reactivo.texto_reactivo}</p>
                  <div>
                    <IconButton>
                      <EditIcon className={classes.iconEdit} onClick={handleClick}/> 
                    </IconButton>
                    <IconButton>
                      <CloseIcon className={classes.iconDelete} onClick={handleDelete}/>
                    </IconButton>
                  </div>
                </div> }/>
            </FormControl>
          </Grid>
        );
      })}
      <Box className={classes.center} item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button variant="contained" color="primary">
            Guardar cambios
          </Button>
      </Box>
    </div>
  );
}
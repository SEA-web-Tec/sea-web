import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { Grid, Select, Radio, RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


// const useStyles = makeStyles((theme) => ({

// }));
const useStyles = makeStyles((theme) => ({

  select: {
    margin: theme.spacing(1),
    minWidth: 80,
    height: 32,
    marginLeft: 27
  },
  selectInstrumentos: {
    margin: theme.spacing(1),
    minWidth: 200,
    height: 32,
  },
}));

export default function FormDialog() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Dialog 
          open={open} 
          maxWidth="md"
          onClose={handleClose} 
          aria-labelledby="form-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
         >
          <Grid container justify="space-between">
              <DialogTitle id="form-dialog-title">Unidad 1 - Exposición</DialogTitle>
              <IconButton  aria-label="close" onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
          </Grid>
          <Divider />
          <DialogContent>
            <DialogContentText>
            <Grid container direction="row">
              <Grid xl={7}>
                  <span>{"Porcentaje de evaluación"}</span>
                  <Select className={classes.select} variant="outlined">           
                  </Select>
              </Grid>
              <Grid item xl={5}>
                <FormControl component="fieldset">
                  <RadioGroup row efaultValue="Equipo">
                    <FormControlLabel
                      value="Equipo"
                      control={<Radio color="primary" />}
                      label="Equipo"
                      labelPlacement="Equipo"
                    />
                    <FormControlLabel
                      value="Individual"
                      control={<Radio color="primary" />}
                      label="Individual"
                      labelPlacement="Individual"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xl={12} lg={12} md={12}  sm={12} xs={12}>
                  <span>{"Instrumentos de evaluación"}</span>
                  <Select className={classes.selectInstrumentos} variant="outlined">           
                  </Select>
                  <IconButton size="small">
                    <CreateIcon color="primary"></CreateIcon>
                  </IconButton>
              </Grid>
              <Grid item xl={12} lg={12} md={12}  sm={12} xs={12} style={{ marginTop: 10 }}>
                <TextField
                  id="filled-full-width"
                  label="Titulo"
                  fullWidth
                  variant="filled"
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12}  sm={12} xs={12}>
                <TextField
                  id="outlined-textarea"
                  label="Instrucciones (Opcional)"
                  style={{ marginTop: 10}}
                  rows={4}
                  multiline
                  fullWidth
                  variant="filled"
                />
              </Grid> 
              <Grid container style={{ marginTop: 20 }} alignContent="center" alignItems="center" item xl={6} lg={6} md={12}  sm={12} xs={12}>
                  <span>{"Fecha de entrega (1ra)"}</span>
                  <TextField
                    id="time"
                    type="date"
                    size="small"
                    style={{ marginLeft: 10 }}
                    variant="outlined"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
              </Grid>
              <Grid container style={{ marginTop: 20 }} alignContent="center" alignItems="center" item xl={6} lg={6} md={12}  sm={12} xs={12}>
                  <span>{"Hora de entrega (1ra)"}</span>
                  <TextField
                    id="time"
                    type="time"
                    size="small"
                    variant="outlined"
                    style={{ marginLeft: 10 }}
                    defaultValue="07:30"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
              </Grid>
              <Grid container  style={{ marginTop: 20 }} alignContent="center" alignItems="center" item xl={6} lg={6} md={12}  sm={12} xs={12}>
                  <span>{"Fecha de entrega (2da)"}</span>
                  <TextField
                    id="time"
                    type="date"
                    size="small"
                    style={{ marginLeft: 10 }}
                    variant="outlined"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
              </Grid>
              <Grid container style={{ marginTop: 20 }} alignContent="center" alignItems="center" item xl={6} lg={6} md={12}  sm={12} xs={12}>
                  <span>{"Hora de entrega (2da)"}</span>
                  <TextField
                    id="time"
                    type="time"
                    size="small"
                    variant="outlined"
                    style={{ marginLeft: 10 }}
                    defaultValue="07:30"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }} justify="center">
              <Button variant="contained" color="primary">
                Modificar tarea
              </Button>
            </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "#ea2c2c" }}>
                Eliminar tarea
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import { Grid, FormControl, TextField } from "@material-ui/core";

const OpcionRespuesta = ({ props, option , num }) => {
    const classes = props;
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl required variant="outlined" className={classes.formControl}>
                    <TextField id="outlined-basic" label={"Opción de respuesta "+ option +')'} variant="outlined"
                    required={ num < 4 }/>
                </FormControl>
            </Grid>
        );
}

export default withStyles(useStyles)(OpcionRespuesta);
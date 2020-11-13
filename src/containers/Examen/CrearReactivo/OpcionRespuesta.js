import React from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Add, Remove} from '@material-ui/icons/';
import { useStyles } from "./Styles";
import { Grid, FormControl, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment } from "@material-ui/core";

const OpcionRespuesta = ({ props, /*array,*/ option , num }) => {

    const classes = props;
    /*const letras = ['a', 'b', 'c', 'd', 'e'];
    const [values, setValues] = React.useState({
        answerOption: '',
        showOption: false,
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowOption = () => {
        setValues({ ...values, showOption: !values.showOption });
        if (!values.showOption) {
            arrayOptions.indicador.push(letras[arrayOptions.indicador.length]);
        } else {
            arrayOptions.indicador.pop()
        }
    };
    const handleMouseDownOption = (event) => {
        event.preventDefault();
    };*/

    //if (num <= arrayOptions.cant-1) {}
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl required variant="outlined" className={classes.formControl}>
                    <TextField id="outlined-basic" label={"Opción de respuesta "+option+')'} variant="outlined"
                    required={num<4}/>
                </FormControl>
            </Grid>
        );
    
    /*else  {//number==3 & max==3
        return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment">{"Opción de respuesta "+option+')'}</InputLabel>
                        <OutlinedInput id="outlined-adornment" type='text' value={values.answerOption} onChange={handleChange('answerOption')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowOption} onMouseDown={handleMouseDownOption} edge="end">
                                        {values.showOption ? <Remove/> : <Add/>}
                                    </IconButton>
                                </InputAdornment>
                            } labelWidth={150}
                        />                                                  
                    </FormControl>
                </Grid>
        );
    }*/
}

export default withStyles(useStyles)(OpcionRespuesta);
import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { useStyles } from "./Styles";

const CalendarioEventos = (props) => {
    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk
                orientation="portrait"
                variant="static"
                openTo="date"
                className={classes.calendario}
            />
        </MuiPickersUtilsProvider>
    );
};

export default CalendarioEventos;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import { Add as AddIcon,  
    Close as CloseIcon,
    Subject as SubjectIcon,
    FormatListBulleted as FormatListBulletedIcon, 
    FormatListNumbered as FormatListNumberedIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
    },
    mainIcon: {
        position: "fixed",
        top: "calc(100% - 80px)",
        left: "calc(100% - 80px)"
    },
    extendedIcon: {
        position: "fixed",
        left: "calc(100% - 72px)"
    }
}));

export default function FloatingButton() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showIcons: false
    });

    const handleClickShow = () => { 
        setValues({ ...values, showIcons: !values.showIcons });
        console.log(values.showIcons);
    };
    return (
        <div className={classes.root} >
            { values.showIcons ? 
            <>
                <Tooltip title="Cerrar" placement="left">
                    <Fab color="primary" onClick={handleClickShow} className={classes.mainIcon}>
                        <CloseIcon/>
                    </Fab>
                </Tooltip>
                <Tooltip title="Abierto" placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 130px)"}}>
                        <SubjectIcon/>
                    </Fab>
                </Tooltip>
                <Tooltip title="Falso/verdadero" placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 180px)"}}>
                        <FormatListBulletedIcon/>
                    </Fab>
                </Tooltip>
                <Tooltip title="Opción múltiple" placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 230px)"}}>
                        <FormatListNumberedIcon/>
                    </Fab>
                </Tooltip>
            </> : 
                <Tooltip title="Crear reactivo" placement="left">
                    <Fab color="primary" onClick={handleClickShow} className={classes.mainIcon}>
                        <AddIcon/>
                    </Fab>
                </Tooltip> 
            }
        </div>
    );
}
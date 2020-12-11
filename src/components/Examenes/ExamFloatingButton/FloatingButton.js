import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import { Add as AddIcon,  
    Close as CloseIcon,
    Subject as SubjectIcon,
    FormatListBulleted as FormatListBulletedIcon, 
    FormatListNumbered as FormatListNumberedIcon,
    StorageOutlined as StorageOutlinedIcon,
    LibraryBooksSharp as LibraryBooksSharpIcon

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

function FloatingButton(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showIcons: false
    });

    const handleClickShow = () => { 
        setValues({ ...values, showIcons: !values.showIcons });
        console.log(props.reactivos);
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
                <Tooltip title={props.reactivos ? "Abierto" : "Crear examen"} placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 130px)"}}>
                    { props.reactivos ? <SubjectIcon/> : <LibraryBooksSharpIcon/> }
                    </Fab>
                </Tooltip>
                <Tooltip title={props.reactivos ? "Falso/verdadero" : "Banco de reactivos"} placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 180px)"}}>
                        { props.reactivos ? <FormatListBulletedIcon/> : <StorageOutlinedIcon/> }
                    </Fab>
                </Tooltip>
                { props.reactivos &&
                    <Tooltip title="Opción múltiple" placement="left">
                        <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 230px)"}}>
                            <FormatListNumberedIcon/>
                        </Fab>
                    </Tooltip>
                }
            </> : 
                <Tooltip title={props.reactivos ? "Crear reactivo" : "Opciones"} placement="left">
                    <Fab color="primary" onClick={handleClickShow} className={classes.mainIcon}>
                        <AddIcon/>
                    </Fab>
                </Tooltip> 
            }
        </div>
    );
}

export default FloatingButton;
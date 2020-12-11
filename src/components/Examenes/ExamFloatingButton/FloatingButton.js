import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
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
    const history = useHistory();
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
                    { props.reactivos ? 
                        <SubjectIcon onClick={()=>{history.push("/examen/reactivo/abierto")}}/> 
                        : <LibraryBooksSharpIcon onClick={()=>{history.push("/examen/crear")}}/> }
                    </Fab>
                </Tooltip>
                <Tooltip title={props.reactivos ? "Falso/verdadero" : "Banco de reactivos"} placement="left">
                    <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 180px)"}}>
                        { props.reactivos ? 
                        <FormatListBulletedIcon onClick={()=>{history.push("/examen/reactivo/fv")}}/> 
                        : <StorageOutlinedIcon onClick={()=>{history.push("/examen/reactivos")}}/> }
                    </Fab>
                </Tooltip>
                { props.reactivos &&
                    <Tooltip title="Opción múltiple" placement="left">
                        <Fab color="primary" size="small" className={classes.extendedIcon} style={{top: "calc(100% - 230px)"}}>
                            <FormatListNumberedIcon onClick={()=>{history.push("/examen/reactivo/multiple")}}/>
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
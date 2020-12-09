import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TablePagination, 
        TableRow, Paper, IconButton } from '@material-ui/core';
import { FirstPage as FirstPageIcon,
        KeyboardArrowLeft as ArrowLeftIcon, 
        KeyboardArrowRight as ArrowRightIcon, 
        Visibility as VisibilityIcon,
        LastPage as LastPageIcon, 
        Check as CheckIcon,
        Close as CloseIcon } from '@material-ui/icons';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page" >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton 
                onClick={handleBackButtonClick} 
                disabled={page === 0} 
                aria-label="previous page">
                {theme.direction === 'rtl' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page" >
                {theme.direction === 'rtl' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page" >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: { minWidth: 300 },
    iconSaw: { color: "#5685ED" },
    iconIncorrect: { color: "#DF042F" },
    iconCorrect: { color: "#04B528" },
});

function ExamenesTable(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const lengthAnswers = (props.type == "resultados") ? props.data.respuestas.length : props.data.length;
    const iniRowsPerPage = (lengthAnswers < 5) ? lengthAnswers : 5;
    const [rowsPerPage, setRowsPerPage] = React.useState(iniRowsPerPage);
    let band = true;
    let total = 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const handleClickRow = () => { // desplegar la respuesta en la parte superior
        console.log("click row");
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table" >
                <TableHead>
                    <TableRow>
                        {props.headers.map((header) => {
                            if (band) {
                                band = false;
                                return (<TableCell>{header}</TableCell>);
                            } else return (<TableCell align="center">{header}</TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.type == "resultados" ?
                        (rowsPerPage > 0
                            ? props.data.respuestas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.data.respuestas
                        ).map((answer) => (
                            <TableRow key={answer.key} onClick={handleClickRow}>
                                <TableCell component="th" scope="row">
                                    { answer.nombre }
                                </TableCell>
                                <TableCell style={{ widthMax: 160 }} align="center">
                                    { answer.respuesta_alumno }
                                </TableCell>
                                <TableCell style={{ widthMax: 160 }} align="center">
                                    { (props.data.respuesta_correcta != null) ?
                                        (answer.respuesta_alumno == props.data.respuesta_correcta)
                                        ? <CheckIcon className={classes.iconCorrect}/> 
                                        : <CloseIcon className={classes.iconIncorrect}/> 
                                    : (answer.puntaje != null) ? 
                                        (answer.puntaje > 0)
                                        ? <CheckIcon className={classes.iconCorrect}/> 
                                        : <CloseIcon className={classes.iconIncorrect}/> 
                                    :"-"}
                                </TableCell>
                                <TableCell style={{ widthMax: 160 }} align="center">
                                    <IconButton>
                                        <VisibilityIcon className={classes.iconSaw}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) 
                    : (rowsPerPage > 0
                            ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.data
                        ).map((answer) => {
                            total += answer.puntaje;
                            return (
                                <TableRow key={answer.key}>
                                    <TableCell component="th" scope="row">
                                        { answer.texto_reactivo }
                                    </TableCell>
                                    <TableCell style={{ widthMax: 160 }} align="center">
                                        { answer.respuesta_alumno }
                                    </TableCell>
                                    <TableCell style={{ widthMax: 160 }} align="center">
                                        { answer.puntaje }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[ 5, 10, 20, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={lengthAnswers}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default ExamenesTable;
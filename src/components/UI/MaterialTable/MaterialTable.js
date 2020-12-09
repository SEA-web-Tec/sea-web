import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "./MaterialTable.styles";
import { Typography } from "@material-ui/core";
import LetterValue from "shared/LetterValue";

const MaterialTableEdit = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography>Evidencia de aprendizaje</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>%</Typography>
            </TableCell>
            {props.columnas.map((letra) => {
              return (
                <TableCell key={LetterValue(letra.label)} align="center">
                  <Typography>{LetterValue(letra.label)}</Typography>
                </TableCell>
              );
            })}
            <TableCell align="center">
              <Typography>Evaluación formativa de la competencia</Typography>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.filas.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                <Typography>{row.evidencia}</Typography>
              </TableCell>
              <TableCell align="right" key={"porcentaje" + row.id}>
                <Typography>{row.porcentaje}</Typography>
              </TableCell>
              {props.columnas.map((letra) => {
                return (
                  <TableCell align="right" key={row.id + letra.label}>
                    <Typography>
                      {row.indicadores[LetterValue(letra.label)]}
                    </Typography>
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Typography>{row.evaluacion}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTableEdit;

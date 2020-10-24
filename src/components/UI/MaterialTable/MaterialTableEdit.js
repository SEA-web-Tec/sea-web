import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Numeric from "react-numeric-input";

import { Select, IconButton, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import LetterValue from "shared/LetterValue";

import useStyles from "./MaterialTable.styles";

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
                <Select
                  disableUnderline
                  key={"EvidenciaAprendizaje" + row.id}
                  value={row.evidencia}
                  onChange={(e) => {
                    props.editar(row.id, "evidencia", e.target.value);
                  }}
                >
                  <option value="Examen">Examen</option>
                  <option value="Ejercicio">Ejercicio</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Exposición">Exposición</option>
                  <option value="Otro">Otro</option>
                </Select>
              </TableCell>
              <TableCell align="right" key={"porcentaje" + row.id}>
                <Numeric
                  className={classes.selectSize}
                  key={"%" + row.id}
                  min={0}
                  max={100 - props.suma(row.id)}
                  value={row.porcentaje}
                  onChange={(e) => {
                    props.editar(row.id, "porcentaje", e);
                  }}
                />
              </TableCell>
              {props.columnas.map((letra) => {
                return (
                  <TableCell align="right" key={row.id + letra.label}>
                    <Numeric
                      className={classes.selectSize}
                      key={letra.label}
                      min={0}
                      max={row.porcentaje}
                      value={row[LetterValue(letra.label)]}
                      onChange={(e) => {
                        props.editar(row.id, LetterValue(letra.label), e);
                      }}
                    />
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Select
                  disableUnderline
                  key={"EvaluacionFormativaCompetencia" + row.id}
                  value={row.evaluacion}
                  onChange={(e) => {
                    props.editar(row.id, "evaluacion", e.target.value);
                  }}
                >
                  <option value="Lista de cotejo">Lista de cotejo</option>
                  <option value="Lista de observación">
                    Lista de observación
                  </option>
                  <option value="Rubrica">Rubrica</option>
                </Select>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  className={classes.addCancel}
                  onClick={() => {
                    props.eliminar(row.id);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTableEdit;

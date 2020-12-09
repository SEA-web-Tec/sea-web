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
                  value={row.evidencia.nombre}
                  onChange={(e) => {
                    props.editar(row.id, "nombre", e.target.value);
                  }}
                >
                  <option value="Examen" defaultValue>
                    Examen
                  </option>
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
                  value={row.evidencia.ponderacion}
                  onChange={(e) => {
                    props.editar(row.id, "ponderacion", e);
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
                      max={
                        row.evidencia.ponderacion -
                        props.sumaFila(row.id, LetterValue(letra.label))
                      }
                      value={
                        row.indicadoresponderacion[LetterValue(letra.label)]
                      }
                      onChange={(e) => {
                        props.editarPonderacion(
                          row.id,
                          LetterValue(letra.label),
                          e
                        );
                      }}
                    />
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Select
                  disableUnderline
                  key={"EvaluacionFormativaCompetencia" + row.id}
                  value={row.evidencia.evaluacion_formativa}
                  onChange={(e) => {
                    props.editar(
                      row.id,
                      "evaluacion_formativa",
                      e.target.value
                    );
                  }}
                >
                  <option value="Lista de cotejo" defaultValue>
                    Lista de cotejo
                  </option>
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

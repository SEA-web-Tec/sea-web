import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Numeric from "react-numeric-input";

import { Select, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  selectSize: {
    width: 100,
  },
  addCancel: {
    color: red[600],
    marginLeft: "auto",
    padding: 5,
  },
});

function letterValue(str) {
  var anum = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };
  return anum[str];
}

const MaterialTableEdit = (props) => {
  const classes = useStyles();

  const suma = 0;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Evidencia de aprendizaje</TableCell>
            <TableCell align="center">%</TableCell>
            {props.columnas.map((letra) => {
              return (
                <TableCell key={letterValue(letra.label)} align="center">
                  {letterValue(letra.label)}
                </TableCell>
              );
            })}
            <TableCell align="center">
              Evaluación formativa de la competencia
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
              <TableCell align="right">
                <TableCell align="right">
                  <Numeric
                    className={classes.selectSize}
                    key={"%" + row.id}
                    min={0}
                    max={100}
                    value={row.porcentaje}
                    onChange={(e) => {
                      props.editar(row.id, "porcentaje", e);
                    }}
                  />
                </TableCell>
              </TableCell>
              {props.columnas.map((letra) => {
                return (
                  <TableCell align="right">
                    <Numeric
                      className={classes.selectSize}
                      key={letra.label}
                      min={0}
                      max={100}
                      value={row[letterValue(letra.label)]}
                      onChange={(e) => {
                        props.editar(row.id, letterValue(letra.label), e);
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

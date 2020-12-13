import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RubricaPDF = () => {

  const id = 1;
  const nombre= "";
  const descripcion= "Esta es una descripción de la rúbrica";
  /*Las columnas deben de estar ordenas por num_columna */
  const renglones = [
    { id: 1, criterio: "Entrego a tiempo todos los trabajos", num_renglon: 1, id_instrumento: 1 },
    { id: 2, criterio: "Criterio 2", num_renglon: 2, id_instrumento: 1 },
    { id: 3, criterio: "Criterio 3", num_renglon: 3, id_instrumento: 1 },
  ];
  const celdas = [
    {
      id: 11,
      texto: "Cumplió con los requisitos 11",
      id_renglon: 1,
      id_columna: 1,
      puntos_max: 50
    },
    {
      id: 21,
      texto: "Cumplió con los requisitos 21",
      id_renglon: 2,
      id_columna: 1,
      puntos_max: 50
    },
    {
      id: 31,
      texto: "Cumplió con los requisitos 31",
      id_renglon: 3,
      id_columna: 1,
      puntos_max: 50
    },
    {
      id: 12,
      texto: "Cumplió con los requisitos 12",
      id_renglon: 1,
      id_columna: 2,
      puntos_max: 5,
    },
    {
      id: 13,
      texto: "Cumplió con los requisitos 13",
      id_renglon: 1,
      id_columna: 3,
      puntos_max: 50
    },
    {
      id: 14,
      texto: "Cumplió con los requisitos 14",
      id_renglon: 1,
      id_columna: 4,
      puntos_max: 50
    },
    {
      id: 15,
      texto: "Cumplió con los requisitos 15",
      id_renglon: 1,
      id_columna: 5,
      puntos_max: 50,
    },
    {
      id: 22,
      texto: "Cumplió con los requisitos 22",
      id_renglon: 2,
      id_columna: 2,
      puntos_max: 50,
    },
    {
      id: 23,
      texto: "Cumplió con los requisitos 23",
      id_renglon: 2,
      id_columna: 3,
      puntos_max: 50,
    },
    {
      id: 24,
      texto: "Cumplió con los requisitos 24",
      id_renglon: 2,
      id_columna: 4,
      puntos_max: 50,
    },
    {
      id: 25,
      texto: "Cumplió con los requisitos 25",
      id_renglon: 2,
      id_columna: 5,
      puntos_max: 50,
    },
    {
      id: 32,
      texto: "Cumplió con los requisitos 32",
      id_renglon: 3,
      id_columna: 2,
      puntos_max: 50,
    },
    {
      id: 33,
      texto: "Cumplió con los requisitos 33",
      id_renglon: 3,
      id_columna: 3,
      puntos_max: 50,
    },
    {
      id: 34,
      texto: "Cumplió con los requisitos 34",
      id_renglon: 3,
      id_columna: 4,
      puntos_max: 50,
    },
    {
      id: 35,
      texto: "Cumplió con los requisitos 35",
      id_renglon: 3,
      id_columna: 5,
      puntos_max: 50,
    },
  ];

    const body = renglones.map((renglon) => {
      const b  = [];
      b.push(renglon.criterio);
      b.push(celdas.filter(celda => celda.id_columna == 1 && celda.id_renglon == renglon.num_renglon)[0].texto + "\r\rPuntos: 50");
      b.push(celdas.filter(celda => celda.id_columna == 2 && celda.id_renglon == renglon.num_renglon)[0].texto);
      b.push(celdas.filter(celda => celda.id_columna == 3 && celda.id_renglon == renglon.num_renglon)[0].texto);
      b.push(celdas.filter(celda => celda.id_columna == 4 && celda.id_renglon == renglon.num_renglon)[0].texto);
      b.push(celdas.filter(celda => celda.id_columna == 5 && celda.id_renglon == renglon.num_renglon)[0].texto);
      return b;
    });
    const rubrica = jsPDF();
    const finalY = rubrica.lastAutoTable.finalY || 10;
    rubrica.setFontSize(12);
    rubrica.text(descripcion, 15, finalY + 15,{
      styles: { fontSize: 5 }})
    rubrica.autoTable({
        startY: finalY+ 20,
        //headStyles:{1:{halign:"center",fillColor:[0,255,0]}},
        head: [['Criterio', 'Excelente', 'Bueno', 'Regular', 'Suficiente','Insuficiente']],
        body: body/*[
          ['Criterio 1', 'Excelente 1', 'Bueno 1', 'Regular 1', 'Suficiente 1','Insuficeinte 1'],
          ['Criterio 2', 'Excelente 2', 'Bueno 2', 'Regular 2', 'Suficiente 2','Insuficeinte 2'],
          ['Criterio 3', 'Excelente 3', 'Bueno 3', 'Regular 3', 'Suficiente 3','Insuficeinte 3'],
          ['Criterio 4', 'Excelente 4', 'Bueno 4', 'Regular 4', 'Suficiente 4','Insuficeinte 4'],
        ],*/
      })
    rubrica.save("rubrica.pdf");
    return (
        <div>
          Rubrica
        </div>

    );
}

export default RubricaPDF;

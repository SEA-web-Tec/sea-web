import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RubricaPDF = () => {
    const rubrica = jsPDF();
    const finalY = rubrica.lastAutoTable.finalY || 10
    rubrica.autoTable({
        startY: finalY+ 20,
        //headStyles:{1:{halign:"center",fillColor:[0,255,0]}},
        head: [['Criterio', 'Excelente', 'Bueno', 'Regular', 'Suficiente','Insuficiente']],
        body: [
          ['Criterio 1', 'Excelente 1', 'Bueno 1', 'Regular 1', 'Suficiente 1','Insuficeinte 1'],
          ['Criterio 2', 'Excelente 2', 'Bueno 2', 'Regular 2', 'Suficiente 2','Insuficeinte 2'],
          ['Criterio 3', 'Excelente 3', 'Bueno 3', 'Regular 3', 'Suficiente 3','Insuficeinte 3'],
          ['Criterio 4', 'Excelente 4', 'Bueno 4', 'Regular 4', 'Suficiente 4','Insuficeinte 4'],
        ],
      })
    rubrica.save("rubrica.pdf");
    return (
        <div>
          Rubrica
        </div>

    );
}

export default RubricaPDF;

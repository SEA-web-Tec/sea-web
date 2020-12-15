const rutasTitulos = {
  // Grupos
  "/grupos": "Grupos",

  // Perfil
  "/perfil": "Perfil",
  "/perfil/editar": "Editar perfil",

  // ID
  "/instrumentacion/": "Instrumentación didáctica", // la diagonal al final es necesaria. Omitir id al final,
  "/instrumentacion//editar": "Editar instrumentación didáctica", // aquí omite la id, pero la diagonal persiste.
  "/instrumentacion/evaluar": "Evaluar instrumentación didáctica",

  // Examenes
  "/examen//": "Exámenes",
  "/examen///crear": "Crear examen",
  "/examen///asignar": "Asignar examen",
  "/examen///reactivos": "Banco de reactivos",
  "/examen///reactivo/abierto": "Crear reactivo abierto",
  "/examen///reactivo/fv": "Crear reactivo falso/verdadero",
  "/examen///reactivo/multiple": "Crear reactivo de opción múltiple",
  "/examen///resultados": "Resultados del examen",
  "/examen///resultados/respuestas": "Respuestas del alumno",
  "/examen///editar": "Editar examen",
  "/examen///id": "Examen por ID",

  // Trabajo individual
  "/trabajo-individual": "Trabajo Individual",

  // Instrumentos
  "/instrumentos": "Instrumentos de Evaluación",
  "/rubrica": "Rubrica",
  "/listacotejo": "Lista de Cotejo",
  "/listaobservacion": "Lista de Observacion",

  //Admin
  "/admin/materias": "Agregar materias",
  "/admin/grupos": "Agregar grupos"
};

const tituloDeRuta = (ruta) => {
  const objeto = Object.entries(rutasTitulos).find((obj) => {
    const coincidencia = ruta.match(/\d+/); // esto es para cuando la ruta contenga una id numérica la omita. Por ejemplo en "/instrumentacion/1"
    const rutaEvaluar = coincidencia !== undefined && coincidencia !== null ? ruta.replace(coincidencia[0], "") : ruta;
    return obj[0].startsWith(rutaEvaluar);
  });
  return objeto !== undefined ? objeto[1] : "";
};

export default tituloDeRuta;

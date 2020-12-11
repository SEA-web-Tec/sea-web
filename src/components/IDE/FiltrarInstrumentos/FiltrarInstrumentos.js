import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

export default function FiltrarInstrumentos(props) {
  /*const [state, setState] = React.useState({
    rubrica: true,
    cotejo: true,
    observacion: true,
    carpeta: true,
  });*/

  /*const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };*/
  return (
    <div>
      <Card>
        <CardHeader subheader="Filtrar Instrumentos"></CardHeader>
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.filtros.rubrica}
                onChange={props.handleChange}
                name="rubrica"
                color="primary"
              />
            }
            label="Rubrica"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.filtros.cotejo}
                onChange={props.handleChange}
                name="cotejo"
                color="primary"
              />
            }
            label="Lista de Cotejo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.filtros.observacion}
                onChange={props.handleChange}
                name="observacion"
                color="primary"
              />
            }
            label="Lista de Observacion"
          />
          {/*<FormControlLabel
            control={
              <Checkbox
                checked={props.filtros.carpeta}
                onChange={props.handleChange}
                name="carpeta"
                color="primary"
              />
            }
            label="Carpetas"
          />*/}
        </CardContent>
      </Card>
    </div>
  );
}

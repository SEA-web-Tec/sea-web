import React, { Component } from "react";
import Portada from "../../../components/Portada/Portada";
import SimpleTabs from "../../../components/Examenes/ExamenesTabs/Tabs";

class CrearReactivoAbierto extends Component {
    render() {
        const reactivos = [ //eliminar y editar: agregar id por reactivo
            {
                unidad: 1,
                tema: "Introducción a las tecnologías de dispositivos móviles",
                reactivos: ['Reactivo 1A','Reactivo 2A','Reactivo 3A','Reactivo 4A'],
            },
            {
                unidad: 2,
                tema: "Arquitectura y entorno de desarrollo",
                reactivos: ['Reactivo 1B','Reactivo 2B'],
            },
            {
                unidad: 3,
                tema: "Desarrollo de aplicaciones móviles",
                reactivos: ['Reactivo 1C','Reactivo 2C','Reactivo 3C'],
            },
            {
                unidad: 4,
                tema: "Administración de datos y comunicación en dispositivos móviles",
                reactivos: ['Reactivo 1D','Reactivo 2D','Reactivo 3D','Reactivo 4D','Reactivo 5D'],
            },
            {
                unidad: 5,
                tema: "<< Nueva unidad mágica ultra misteriosa ùwú >>",
                reactivos: ['Reactivo 1E','Reactivo 2E','Reactivo 3E','Reactivo 4E','Reactivo 5E'],
            }
        ];
        return (
            <Portada
                materia="Programación de Dispositivos Móviles"
                carrera="Ing. Sistemas Computacionales"
                maestro="José Tadeo Rodriguez Solano"
                grupo="F"
                periodo="Enero - Junio 2020"
                hasTabs>
                <SimpleTabs data={reactivos}/>
            </Portada>
        );
    }
}

export default CrearReactivoAbierto;
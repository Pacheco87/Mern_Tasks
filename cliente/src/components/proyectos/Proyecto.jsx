import React, {useContext}  from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tarea/tareaContext';

const Proyecto = ({proyecto}) => {
        //Obtener el state de proyectos
        const proyectosContext = useContext(proyectoContext);
        const { proyectoActual } = proyectosContext;

        //Obtener el state de tareas
        const tareasContext = useContext(TareaContext);
        const { obtenerTareas } = tareasContext;

        //Funcion para agregar el proyecto actual
        const seleccionarProyecto = id =>{
            proyectoActual(id); //Seleccionar proyecto actual
            obtenerTareas(id); //Filtrar Tareas del proyecto actual
        }

    return ( 
        <li>
            <button
                type="button"
                className = "btn btn-blank"
                onClick = {() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;
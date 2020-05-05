import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tarea/tareaContext';
import { CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = () => {
    //Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //obtener tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    //Si no hay proyecto seleccionado 

    if(!proyecto) return <h2>Seleccione un proyecto</h2>

    //Arraydestructurin
    const [proyectoActual] = proyecto;

    //Elimina 
    const deleteProyect = () =>{
        eliminarProyecto(proyectoActual.id);
    }
    return ( 

        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul>
                {tareasProyecto.length === 0
                    ?
                        <li className="tarea"><p>No hay tareas</p></li>
                    :
                        <TransitionGroup>
                           {tareasProyecto.map(tarea =>(
                               <CSSTransition
                                    key={tarea.id}
                                    timeout={200}
                                    className="tarea"
                                >
                                   <Tarea 
                                        tarea={tarea}
                                    />
                               </CSSTransition>
                            )) }
                        </TransitionGroup>
                }
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={deleteProyect}
            >
                    Eliminar proyecto &times;
                </button>
        </Fragment>
     );
}
 
export default ListadoTareas;


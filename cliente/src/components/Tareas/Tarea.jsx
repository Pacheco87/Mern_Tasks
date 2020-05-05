import React, {useContext} from 'react';
import tareaContext from '../../context/tarea/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {
    // Exportamos el context de tareas
    const tareasContext =   useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual} = tareasContext;

    //Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto} = proyectosContext;

    const [proyectoActual] = proyecto;


    //Funcion que se ejecuta cuando el usuario presiona eliminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id);
    }

    //funcion que modifica el estado de las tareas
    const cambiarEstado = tarea =>{
      if(tarea.estado){
        tarea.estado = false
      }else{
        tarea.estado = true
      }
      cambiarEstadoTarea(tarea);
    }

    //Agrega una tarea actual para editar
    const seleccionaTarea = tarea =>{
      guardarTareaActual(tarea);
    }
    return (
        <li className="tarea sombra">
          <p>{tarea.nombre}</p>

          <div className="estado">
            {tarea.estado
              ?
                (
                  <button
                    type="button"
                    className="completo"
                    onClick={() => cambiarEstado(tarea)}
                  >
                    Completo
                  </button>
                )
              :
                (
                  <button
                    type="button"
                    className="incompleto"
                    onClick={() => cambiarEstado(tarea)}
                  >
                    Incompleto
                  </button>
                ) 
            }
          </div>
          <div className="acciones">
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => seleccionaTarea(tarea)}

            >Editar</button>
            <button
              type="button"
              className="btn btn-secundario"
              onClick={() => tareaEliminar(tarea.id)}
            >
              Eliminar</button>
          </div>
        </li>
      );
}
 
export default Tarea;
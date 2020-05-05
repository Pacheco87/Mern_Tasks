import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tarea/tareaContext';

const FormTarea = () => {
    //Obtener si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener context de tareas
    const tareasContext = useContext(tareaContext);
    const {
            tareaSeleccionada,
            errorTarea, 
            agregarTarea, 
            validarTarea, 
            obtenerTareas,
            actulizarTarea,
            limpiarTarea
        } = tareasContext;

    //Efect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada){
            setTarea(tareaSeleccionada);
        }else{
            setTarea({
                nombre:''
            });
        }
    },[tareaSeleccionada]);
    //State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });

    //Destructuring
    const {nombre} = tarea;

    //Si no hay proyecto seleccionado 

    if(!proyecto) return null;

    //Arraydestructurin
    const [proyectoActual] = proyecto;

    //Leer valores del formulario
    const handleChange = e =>{
        setTarea({
            ...tarea,
            [e.target.name]: [e.target.value]
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //Validar
        if(nombre === ''){
            validarTarea();
            return;
        }
       
        //Revisamos si es nueva tarea o edición
        if(tareaSeleccionada){
            //Modificar Tarea
            actulizarTarea(tarea);
            //Limpia tarea seleccionada
            limpiarTarea();
        } else {
            //Agregar la nueva tarea
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }

        

         //Obtener las tareas del proyecto
         obtenerTareas(proyectoActual.id);

        //Reiniciar el form 
        setTarea({
            nombre:''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Introudce el nombre de la tarea"
                        name="nombre"
                        value = {nombre}
                        onChange = {handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Guardar Tarea" : "Añadir tarea"}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;
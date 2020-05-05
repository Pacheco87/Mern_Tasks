import React, { Fragment, useState, useContext } from "react";
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {


    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    const { formulario, mostrarFormulario, agregarProyecto, mostrarError, errorformulario} = proyectosContext;
    //State del nuevo proyecto
    const [proyecto, setProyecto] = useState({
        nombre:''
    });

    //Extraer datos proyecto

    const {nombre} = proyecto;

    //Lee los contenidos del input
    const onChangeProyecto = e =>{
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    // Cuando el usuario hace submiyt

    const onSubmitProyecto = e =>{
        e.preventDefault();
        //Validar proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        //Agregar al state
        agregarProyecto(proyecto);
        //Reiniciar el form 
        setProyecto({
            nombre:''
        })

    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick ={()=>mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            {
                formulario ?
                    (<form
                        className="formulario-nuevo-proyecto"
                        onSubmit = {onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            name="nombre"
                            placeholder="Nombre Proyecto"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>)
                : null}
            {errorformulario ? 
                <p className="mensaje error">
                    El nombre de proyecto es obligatorio
                </p> 
                : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;
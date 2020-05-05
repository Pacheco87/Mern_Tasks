import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {v4 as uuid} from "uuid";

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props =>{
    const initialState = {
        tareas: [
            {id: 1,nombre: "Elegir plataforma", estado:true, proyectoId: 1},
            {id: 2,nombre: "Elegir colores", estado:false, proyectoId: 2},
            {id: 3,nombre: "Elegir fondo", estado:false, proyectoId: 3},
            {id: 4,nombre: "Elegir hosting", estado:true, proyectoId: 4},
            {id: 5,nombre: "Elegir plataforma", estado:true, proyectoId: 1},
            {id: 6,nombre: "Elegir colores", estado:false, proyectoId: 2},
            {id: 7,nombre: "Elegir fondo", estado:false, proyectoId: 3},
            {id: 8,nombre: "Elegir plataforma", estado:true, proyectoId: 1},
            {id: 9,nombre: "Elegir colores", estado:false, proyectoId: 2},
            {id: 10,nombre: "Elegir fondo", estado:false, proyectoId: 3},
            {id: 11,nombre: "Elegir hosting", estado:true, proyectoId: 4}
        ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null

    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear Funciones
    //Obtener Tareas
    const obtenerTareas = proyectoId =>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }
    // Agregar tarea al proyecto seleccionado
    const agregarTarea =  tarea =>{
        tarea.id = uuid.v4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Error tarea
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar Tarea por id
    const eliminarTarea = tareaId =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        })
    }

    //Cambiamos el estado de la tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //extrae la tarea para editarla
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Actualizamos tarea
    const actulizarTarea = tarea =>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload: tarea
        })
    }
    //Limpia tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actulizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
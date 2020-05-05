const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Crea una nueva tarea
exports.crearTarea = async(req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        //Extraemos el proyecto
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto pertenece al usuario 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        
        //Crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
} 

//Obtiene tareas por proyectos 
exports.obtenerTareas = async (req,res) => {
    try {
        //Extraemos el proyecto 
        const {proyecto} = req.body;
        //Comprobamos si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto pertenece al usuario 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');    
    }
}

//Actualizar tarea 
exports.actualizarTarea = async (req, res) =>{
    try {
        //Extraemos el proyecto 
        const {proyecto, nombre, estado} = req.body;

        //Revisar si existe la tarea
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).jquery({msg: 'Tarea no encontrada'});
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Revisar si el proyecto pertenece al usuario 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        
        //Crear objeto con la nueva información
        const nuevaTarea = {};

        if(nombre) nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;

        //Guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}
exports.eliminarTarea = async (req,res) => {
    try {
        //Extraemos el proyecto 
        const {proyecto} = req.body;

        //Revisar si existe la tarea
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).jquery({msg: 'Tarea no encontrada'});
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Revisar si el proyecto pertenece al usuario 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        
        //Eliminar 
        await Tarea.findByIdAndRemove({_id: req.params.id });
        res.json({msg: 'Se ha eliminado una tarea'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea Proyectos
// api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre de proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.CrearProyecto
);

//Obtener todos los proyectos
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

//Modificar proyecto
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre de proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto 

router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto

)
module.exports = router;
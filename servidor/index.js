const express = require('express');
const conectarDB = require('./config/db');
//Crear el servidor
const app = express();

//Conectamos con la Base de datos
conectarDB();

//Habilitar express.json

app.use(express.json({ extended: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas 
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Arrrancamos el servidor
app.listen(PORT, () =>{
    console.log(`El servidor está funcionando por el puerto ${PORT}`)
})
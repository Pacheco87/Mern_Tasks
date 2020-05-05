import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';

const NuevaCuenta = () => {

    //Extraer valores del context 
    const alertaContext = useContext(AlertaContext);
    const {mostrarAlerta, alerta} = alertaContext;

    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email:'',
        password:'',
        confirmar:''
    });

    //Extraer de usuario
    const {nombre,email,password,confirmar} = usuario;

    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    //Al hacer submit el formulario a traves del bóton del login
    const onSubmit = e =>{
        e.preventDefault();

        //Validación de los campos vacios
        if(nombre.trim() === '' ||
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return;
            }
        // Password min 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe contener como minimo 6 caracteres', 'alerta-error');
            return;
        }
        //Validar que los dos password sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los dos passwords deben coincidir', 'alerta-error');
            return;
        }
        //Pasar al action
        

    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crea una cuenta nueva</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Introduce tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Introduce tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Introduce tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirma password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Introduce el password de nuevo"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar"
                        />
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
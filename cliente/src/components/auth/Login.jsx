import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    //Extraer de usuario
    const {email,password} = usuario;

    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    //Al hacer submit el formulario a traves del bóton del login
    const onSubmit = e =>{
        e.preventDefault();

        //Validación

        //Pasar al action

    }

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">
                    Crear nueva cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;
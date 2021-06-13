import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { finishCheking, startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: '',
        emailR: '',
        password1: '',
        password2: '',
        name: ''

    })

    const { email, emailR, password, password1, password2, name } = values
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(finishCheking());
    }, [dispatch])

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        console.log('Register', name, emailR, password1, password2)
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="password"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                onChange={handleInputChange}
                                value={name}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="email"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Correo"
                                name="emailR"
                                value={emailR}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="password"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password1"
                                value={password1}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="password2"
                                value={password2}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
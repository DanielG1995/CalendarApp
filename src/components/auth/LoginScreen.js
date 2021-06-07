import React from 'react';
import './login.css';

export const LoginScreen = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="password"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Contraseña"
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
                    <form>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="email"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="password"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
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
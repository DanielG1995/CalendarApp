import { fetchContoken, fetchSintoken } from "../helpers/fetch";
import { types } from "../types/types";

import Swal from 'sweetalert2'
import { clearData } from "./events";



export const startLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSintoken('auth', { email, password }, 'POST');
            const data = await resp.json();

            if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-start-date', new Date().getTime())
                dispatch(login({ name: data.name, id: data.id }));
            } else {
                Swal.fire(
                    'Error',
                    data.msg,
                    'error'
                )
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error,
                'error'
            )
        }
    }
};

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSintoken('auth/new', {
                name,
                email,
                password
            }, 'POST');
            const data = await resp.json();

            if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-start-date', new Date().getTime())
                dispatch(login({ name: data.name, id: data.id }));
            } else {
                Swal.fire(
                    'Error',
                    data.msg,
                    'error'
                )
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error,
                'error'
            )
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(clearData())
        dispatch(logout());
    }
}

export const logout = () => {
    return {
        type: types.authLogout
    }
}

export const startCheking = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchContoken('auth/renew');
            const data = await resp.json();
            if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-start-date', new Date().getTime())
                dispatch(login({ name: data.name, id: data.id }));
            } else {
                Swal.fire(
                    'Aviso',
                    data.msg,
                    'warning'
                )
                dispatch(finishCheking());
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error,
                'error'
            )
        }
    }
}

export const finishCheking = () => {
    return {
        type: types.authFinishCheking,
    }
}

export const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
}
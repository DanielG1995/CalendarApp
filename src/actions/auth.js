import { fetchSintoken } from "../helpers/fetch";
import { types } from "../types/types";

import Swal from 'sweetalert2'



export const startLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(startCheking());
        try {
            const resp = await fetchSintoken('auth', { email, password }, 'POST');
            const data = await resp.json();
            const { name, id, token, ok, msg } = data;
            console.log(data)
            if (ok) {
                localStorage.setItem('token', token);
                localStorage.setItem('token-start-date', new Date().getTime())
                dispatch(login({ name, id }));
            } else {
                Swal.fire(
                    'Error',
                    msg,
                    'error'
                )
            }
        } catch (error) {
        }
    }
};

export const startCheking = () => {
    return {
        type: types.authCheking,
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
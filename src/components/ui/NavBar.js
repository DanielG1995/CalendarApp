import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    }
    return (
        <div className="navbar navbar-dark bg-dark mb-4 p-3">
            <span className="navbar-brand">{name}</span>
            <button onClick={handleLogout} className="btn btn-danger ">Salir</button>
        </div>
    )
}

import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../actions/calendar';

export const DeleteFab = () => {

    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch(deleteNote());
    }


    return <>
        <button
            className="btn btn-danger fab-delete"
            onClick={handleDeleteEvent}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento</span>
        </button>

    </>

}

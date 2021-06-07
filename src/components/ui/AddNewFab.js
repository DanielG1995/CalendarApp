import React from 'react'
import {useDispatch} from 'react-redux'
import { setActiveEvent } from '../../actions/events';
import moment from 'moment'
import { openModal } from '../../actions/calendar';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleAddEvent=()=>{
        dispatch(setActiveEvent({
            title: '',
            start: moment().add(2, 'hours').toDate(),
            end: moment().add(4, 'hours').toDate(),
        }));
        dispatch(openModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleAddEvent}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}

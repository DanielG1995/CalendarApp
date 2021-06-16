import Swal from "sweetalert2"
import { fetchContoken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"



export const startNewNote = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const loadEvents = (events) => {
    return {
        type: types.eventLoad,
        payload: events
    }
}

export const startEditEvent = (event) => {
    return async (dispatch) => {
        const resp = await fetchContoken(`events/${event.id}`, event, 'PUT');
        const data = await resp.json();
        if (data.ok) {
            dispatch(editEvent(event));
            Swal.fire('', 'Modificado', 'success');
        } else {
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

export const startloadEvents = () => {
    return async (dispatch) => {
        const resp = await fetchContoken('events');
        const data = await resp.json();
        if (data.ok) {
            const events = prepareEvents(data.events);
            dispatch(loadEvents(events));
        } else {
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

export const startAddNewEvent = (evento) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        const res = await fetchContoken('events', evento, 'POST');
        const data = await res.json();
        if (data.ok) {
            evento.id = data.evento.id
            evento.user = {
                _id: uid,
                name
            }
            dispatch(addNewEvent(evento));
        } else {
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

const addNewEvent = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
}

export const editEvent = (event) => {
    return {
        type: types.eventEdit,
        payload: event
    }
}

export const deleteEvent = () => {
    return {
        type: types.eventDelete,
    }
}

export const startDeleteEvent = () => {
    return async (dispatch, getState) => {
        const { activeEvent } = getState().calendar;
        const res = await fetchContoken(`events/${activeEvent.id}`, activeEvent, 'DELETE');
        const data = await res.json();
        console.log(data);
        if (data.ok) {
            Swal.fire('Info', 'Evento Borrado', 'info');
            dispatch(deleteEvent());
        } else {
            Swal.fire('Error', data.msg, 'error');
        }
    }
}

export const setActiveEvent = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const clearActiveEvent = () => {
    return {
        type: types.eventClear,
    }
}

export const clearData = () => {
    return {
        type: types.eventClearData
    }
}
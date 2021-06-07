import { types } from "../types/types"



export const startNewNote = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const addNewEvent = (event) => {
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
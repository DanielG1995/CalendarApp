import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: {
                    ...action.payload
                }
            }
        case types.eventEdit:
            return {
                ...state,
                events: state.events.map((event) => (
                    (event.id === action.payload.id) ?
                        action.payload :
                        event))
            }
        case types.eventClear:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter((event) => (
                    (event.id !== state.activeEvent.id))),
                activeEvent: null
            }
        case types.eventLoad:
            return {
                ...state,
                events: [...action.payload],
            }
        case types.eventClearData:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
import { types } from "../types/types";


const initialState = {
    cheking: true,
    uid: null,
    name: null

}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authCheking:
            return {
                ...state,
                cheking: true
            }
        case types.authFinishCheking:
            return {
                ...state,
                cheking: false
            }
        case types.authLogin:
            return {
                ...state,
                cheking: false,
                name: action.payload.name,
                uid: action.payload.id
            }
        default:
            return state;
    }
}
import { types } from "../types/types"

export const openModal = () => {
    return {
        type: types.uiOpenModal
    }
}

export const closeModal = () => {
    return {
        type: types.uiCloseModal
    }
}

export const deleteNote = () => {
    return {
        type: types.eventDelete,
    }
}
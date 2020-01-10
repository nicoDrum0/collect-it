import { TOGGLE_RENAME_MODAL } from './actionTypes'

export const toggleRenameModal = bool => {
    return {
        type: TOGGLE_RENAME_MODAL,
        bool
    }
}

import { TOGGLE_RENAME_MODAL, TOGGLE_ADD_SITE_MODAL } from './actionTypes'

export const toggleRenameModal = bool => {
    return {
        type: TOGGLE_RENAME_MODAL,
        bool
    }
}

export const toggleAddSiteModal = bool => {
    return {
        type: TOGGLE_ADD_SITE_MODAL,
        bool
    }
}

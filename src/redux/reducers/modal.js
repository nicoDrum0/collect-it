import {
    TOGGLE_RENAME_MODAL,
    TOGGLE_ADD_SITE_MODAL
} from '../actions/actionTypes'

const initialState = {
    showRenameModal: false,
    showAddSiteModal: false
}

export default (state = initialState, action) => {
    if (action.type === TOGGLE_RENAME_MODAL) {
        return {
            ...state,
            showRenameModal: action.bool
        }
    }

    if (action.type === TOGGLE_ADD_SITE_MODAL) {
        return {
            ...state,
            showAddSiteModal: action.bool
        }
    }

    return state
}

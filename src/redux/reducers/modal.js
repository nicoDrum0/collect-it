import { TOGGLE_RENAME_MODAL } from '../actions/actionTypes'

const initialState = {
    showRenameModal: false
}

export default (state = initialState, action) => {
    if (action.type === TOGGLE_RENAME_MODAL) {
        return {
            ...state,
            showRenameModal: action.bool
        }
    }

    return state
}

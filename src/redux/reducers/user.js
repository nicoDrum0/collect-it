import { SET_FOLDER, SET_USER_ID } from '../actions/actionTypes'

const initialState = {
    userId: null,
    folder: null
}

export default (state = initialState, action) => {
    if (action.type === SET_FOLDER) {
        return {
            ...state,
            folder: action.val
        }
    }

    if (action.type === SET_USER_ID) {
        return {
            ...state,
            userId: action.id
        }
    }
    return state
}

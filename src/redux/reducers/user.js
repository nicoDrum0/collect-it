import { SET_FOLDER, SET_USER_ID, SET_USER_NAME } from '../actions/actionTypes'

const initialState = {
    userId: null,
    username: null,
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

    if (action.type === SET_USER_NAME) {
        return {
            ...state,
            username: action.name
        }
    }
    return state
}

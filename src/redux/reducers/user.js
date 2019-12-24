import { SET_FOLDER } from '../actions/actionTypes'

const initialState = {
    folder: null
}

export default (state = initialState, action) => {
    if (action.type === SET_FOLDER) {
        return {
            ...state,
            folder: action.val
        }
    }
    return state
}

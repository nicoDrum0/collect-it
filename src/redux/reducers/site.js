import { SET_SITE_STORE } from '../actions/actionTypes'

const initialState = {
    siteStore: null
}

export default (state = initialState, action) => {
    if (action.type === SET_SITE_STORE) {
        return {
            ...state,
            siteStore: action.val
        }
    }

    return state
}

import { SET_SITE_STORE } from './actionTypes'

export const setSiteStore = val => {
    return {
        type: SET_SITE_STORE,
        val
    }
}

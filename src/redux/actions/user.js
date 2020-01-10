import { SET_FOLDER, SET_USER_ID } from './actionTypes'

export const setFolder = val => {
    return {
        type: SET_FOLDER,
        val
    }
}

export const setUserId = id => {
    return {
        type: SET_USER_ID,
        id
    }
}

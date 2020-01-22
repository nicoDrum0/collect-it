import { SET_FOLDER, SET_USER_ID, SET_USER_NAME } from './actionTypes'

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

export const setUserName = name => {
    return {
        type: SET_USER_NAME,
        name
    }
}

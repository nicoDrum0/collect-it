import { SET_FOLDER } from './actionTypes'

export const setFolder = val => {
    return {
        type: SET_FOLDER,
        val
    }
}

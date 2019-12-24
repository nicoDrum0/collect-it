import { SET_TREE_DATA } from './actionTypes'

export const setTreeData = data => {
    return {
        type: SET_TREE_DATA,
        data
    }
}

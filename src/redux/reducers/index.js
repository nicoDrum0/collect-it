import { combineReducers } from 'redux'
import user from './user'
import site from './site'
import modal from './modal'

const rootReducer = combineReducers({
    user,
    site,
    modal
})

export default rootReducer

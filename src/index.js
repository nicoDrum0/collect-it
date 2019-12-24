import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.scss'
import MainRouter from './route'
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <MainRouter />
    </Provider>,
    document.getElementById('root')
)

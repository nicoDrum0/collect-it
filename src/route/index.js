import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import HomePage from '../components/pages/HomePage'

const MainRouter = () => (
    <Router>
        <Redirect from={'/'} to={'/login'} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/homepage'} component={HomePage} />
    </Router>
)

export default MainRouter
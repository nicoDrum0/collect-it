import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Register = props => {
    return ( 
        <div className="register">
            <Link to={'/login'}>register to login</Link>
        </div>
    )
}

export default Register
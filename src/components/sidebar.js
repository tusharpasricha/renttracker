import React, { useContext, useEffect, useState } from 'react'
import "../home.css"
import AuthContext from '../stores/AuthContext'

const Sidebar = () => {

    const { logout } = useContext(AuthContext);
    const { user, client } = useContext(AuthContext);
    const logoutHandler = () => {
        logout().then(() => {
            console.log('Logout Successful');
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <div className='sidebar'>
                <h4 ><a href="/">RENT TRACKER</a></h4>
                {user && <button onClick={logoutHandler} className="btn">LOGOUT</button>}
                </div>
  )
}

export default Sidebar
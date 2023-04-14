import React, { useContext } from 'react'
import AuthContext from '../stores/AuthContext'
import classes from './navbar.module.css'

const Navbar = () => {

    const { logout } = useContext(AuthContext);

    const { user } = useContext(AuthContext);

    const logoutHandler = () => {
        logout().then(() => {
            console.log('Logout Successful');
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <nav className={classes.navbar}>
            <h4 className={classes.nav_heading}><a href="/">RENT TRACKER</a></h4>
            {user && <button onClick={logoutHandler} className={classes.btn}>LOGOUT</button>}
        </nav>
    )

}

export default Navbar
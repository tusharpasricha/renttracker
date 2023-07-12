import React, { useContext } from 'react'
import "../home.css"
import AuthContext from '../stores/AuthContext'

const Sidebar = () => {

    const { logout } = useContext(AuthContext);
    const { user, client } = useContext(AuthContext);
    // console.log("(Sidebar)user is "+JSON.stringify(user) );
    // console.log("(Sidebar)client is "+JSON.stringify(client) );
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


// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import AuthContext from '../stores/AuthContext';
// import '../home.css';

// const Sidebar = () => {
//   const { user, logout } = useContext(AuthContext);

//   const logoutHandler = async () => {
//     try {
//       await logout();
//       console.log('Logout Successful');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="sidebar">
//       <h4>
//         <a href="/">RENT TRACKER</a>
//       </h4>
//       {user && (
//         <button onClick={logoutHandler} className="btn">
//           LOGOUT
//         </button>
//       )}
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   user: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired,
// };

// export default Sidebar;

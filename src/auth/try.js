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

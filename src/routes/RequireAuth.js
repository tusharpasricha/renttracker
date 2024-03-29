import React, { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import AuthContext from "../context/AuthContext"

function RequireAuth({ children }) {
    let auth = useContext(AuthContext); //current context value
    let location = useLocation(); // use to get the current loc object from react router 

    

    if (!auth.user) {
        console.log("User is not authnticated")
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    console.log("auth.user:"+ auth.user +"Ensured user Authentication");
    //console.log("auth.user:"+ JSON.stringify(auth.user));

    return children;
}

export default RequireAuth;
//it serves as a route guard that ensure that the user is authenticated before allowing access to the protected routes
//it takes the children prop which represents the components to be rendered if the user is authenticated;
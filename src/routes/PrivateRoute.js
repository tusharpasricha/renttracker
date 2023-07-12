import React, { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import AuthContext from "../stores/AuthContext"

function RequireAuth({ children }) {
    let auth = useContext(AuthContext);
    let location = useLocation();

    console.log("auth.user:"+ JSON.stringify(auth.user));

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
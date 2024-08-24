import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../data/firebase";

const AuthContext = React.createContext();
   
export default AuthContext;

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const auth = getAuth(app);//initializes the firebase authentication instance

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password); // return a promise representing signup process
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);// return a promise representing login process
    }

    const logout = () => {
        return signOut(auth);// return a promise representing logout process
    }

    const getMonth = (month) => {
        switch (month) {
            case 1:
                return "Jan"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "May"
            case 6:
                return "Jun"
            case 7:
                return "Jul"
            case 8:
                return "Aug"
            case 9:
                return "Sep"
            case 10:
                return "Oct"
            case 11:
                return "Nov"
            case 12:
                return "Dec"
            default:
                break;
        }
    }
    
    const value = {
        signup,
        login,
        logout,
        user,
        getMonth
    }

    useEffect(() => {
        // function from Firebase authentication, which listens to changes in the user's authentication state. 
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        })

        return unsubscribe;

    }, [])
    
    //The Provider component is responsible for providing the context data to all the components that are descendants of it.
    //When the value of the context changes, all the components consuming that context will re-render.
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}


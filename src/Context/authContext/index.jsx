import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { dosigninwithemailandpassword, doSigninWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../../Context/authContext"

const AuthContext = React.createContext();

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser]=useState(null);
    const [userLoggedin, setUserLoggedin]=useState(false);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const Unsubscribe = onAuthStateChanged(auth, initializeUser);
        return Unsubscribe

    },)
    async function initializeUser (user){
        if (user){
            setCurrentUser({...user});
            setUserLoggedin(true);
        }
        else{
            setCurrentUser(null);
            setUserLoggedin(false);
        }
        setLoading(false);
    }
    const value = {
        currentUser,
        userLoggedin,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
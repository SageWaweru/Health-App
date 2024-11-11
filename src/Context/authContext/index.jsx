import { useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doSigninWithEmailAndPassword, doSigninWithGoogle } from "../../firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedin, setUserLoggedin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedin(true);
        } else {
            setCurrentUser(null);
            setUserLoggedin(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedin,
        loading,
        signInWithEmailAndPassword: doSigninWithEmailAndPassword,
        signInWithGoogle: doSigninWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

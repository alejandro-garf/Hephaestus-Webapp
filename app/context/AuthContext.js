'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, updateCurrentUser } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext()
const provider = new GoogleAuthProvider();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);    
        });
        return () => unsubscribe(); // Clean up subscription
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
            </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
'use client'; 

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

// Context for authentication
const AuthContext = createContext();

// Google Auth provider instance
const provider = new GoogleAuthProvider();

// AuthContextProvider component to wrap around components that need access to the auth context
export const AuthContextProvider = ({ children }) => {
    // State to hold the current user object
    const [user, setUser] = useState(null);

    // Function to handle Google sign-in
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider(); // new GoogleAuthProvider instance
        signInWithPopup(auth, provider); // Sign in with a popup using Firebase auth and Google provider
    };

    // Function to handle sign-out
    const logOut = () => {
        signOut(auth); // Sign out the current user using Firebase auth
    };

    // useEffect to handle changes in authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user state when authentication state changes
        });
        return () => unsubscribe(); // Clean up the subscription to avoid memory leaks
    }, []);

    // Provide the user, googleSignIn, and logOut functions to any component that consumes this context
    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext in other components
export const UserAuth = () => {
    return useContext(AuthContext); // Access the AuthContext to get the user and auth functions
};

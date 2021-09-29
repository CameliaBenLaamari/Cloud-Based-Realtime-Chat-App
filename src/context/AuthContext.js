import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signOut() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signIn,
        signUp,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
import { Outlet, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const PrivateRoutes = () => {
    // Top level state variables to set Authorization State 
    const [auth, setAuth] = useState({loading: true, user: null});
    // useEffect sets gets Auth token from Firebase and changes the Auth state variable
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            setAuth({loading: false, user})
        });
        return unsubscribe;
    }, []);
    // If the Firebase auth token is set to true the loading property is set to false
    // and the component does not render the page
    if(auth.loading) {
        return null;
    }
    // Conditionally renders landing page through <Outlet/> component if user prop is truthy, otherwise returns user to login screen
    return auth.user ? <Outlet /> : <Navigate to='/userAuth' /> 
}

export default PrivateRoutes;


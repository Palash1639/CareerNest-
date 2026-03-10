import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
    // Component is passed as a prop to be rendered if authenticated
    const { Component } = props;
    const navigate = useNavigate();
    const token = Cookies.get("myToken");

    useEffect(() => {
        // If there's no token, send user back to login page
        if (token === undefined) {
            navigate("/login");
        }
    }, [token, navigate]);

    // If token exists, render the Component, otherwise render nothing (useEffect will handle redirect)
    return token !== undefined ? <Component /> : null;
};

export default ProtectedRoute;
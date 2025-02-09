import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ element }) => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return null; // or a loading indicator
    }

    return user ? element : <Navigate to="/map" />;
};

export default PrivateRoute;
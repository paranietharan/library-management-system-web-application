import React from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

// LogoutUser.js
const LogoutUser = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        const performLogout = () => {
            localStorage.removeItem('token');
            logout();
            navigate('/login');
        };

        performLogout();
    }, [logout, navigate]);

    return null; // This component doesn't render anything
};

export default LogoutUser;
import { useAuth } from "./AuthContext";

// logout.js
const LogoutUser = () => {
    localStorage.removeItem('token');
    const { logout } = useAuth();
    logout();
    // Redirect to login page. Adjust the path as necessary.
    window.location.href = '/login';
};

export default LogoutUser;
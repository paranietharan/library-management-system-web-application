// logout.js
const LogoutUser = () => {
    localStorage.removeItem('token');
    // Redirect to login page. Adjust the path as necessary.
    window.location.href = '/login';
};

export default LogoutUser;
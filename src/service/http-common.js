import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { baseURL } from "./baseURL";



const httpCommon = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});

httpCommon.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (isExpired) {
                LogoutUser(); // Token is expired, logout the user.
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            LogoutUser(); // No token found, need to login again.
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default httpCommon;

const navigate = useNavigate();

export const LogoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login')
}
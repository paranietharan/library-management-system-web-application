import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import dayjs from "dayjs";
import { baseURL } from "./BaseUrl"; 
import LogoutUser from "./LogoutUser";


const httpMultipart = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "multipart/form-data"
    }
});

httpMultipart.interceptors.request.use(
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
        }
        else {
            LogoutUser(); // No token found, need to login again.
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpMultipart;




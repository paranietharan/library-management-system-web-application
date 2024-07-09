import axios from "axios";

const httpMultipart = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "multipart/form-data"
    }
});

export default httpMultipart;
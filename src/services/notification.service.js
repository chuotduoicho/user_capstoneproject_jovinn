import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1";



const getAllNotification = () => {
    return axios
        .get(API_URL + "/users/notifications", { headers: authHeader() })
        .then((response) => {
            localStorage.setItem("notifications", JSON.stringify(response.data));
            return response.data;
        });
};

const notificationService = {
    getAllNotification
};

export default notificationService;
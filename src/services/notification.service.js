import axios from "axios";
import authHeader from "./auth-header";
// const API_URL = "http://localhost:8080/api/v1";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1";
const getAllNotification = () => {
  return axios
    .get(API_URL + "/users/notifications", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const readNotification = (notificationId) => {
  return axios
    .put(API_URL + "/users/read-noti/" + notificationId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteNotification = (notificationId) => {
  return axios
    .delete(API_URL + "/users/delete-noti/" + notificationId, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const notificationService = {
  getAllNotification,
  readNotification,
  deleteNotification,
};

export default notificationService;

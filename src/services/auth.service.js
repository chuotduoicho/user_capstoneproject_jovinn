import axios from "axios";
import { API_PATH } from "../config";

// const API_URL = API_PATH + "/api";
const API_URL = process.env.REACT_APP_API_URL + "/api";
const register = (username, password, email, firstName, lastName) => {
  return axios.post(API_URL + "/auth/signup", {
    username,
    password,
    email,
    firstName,
    lastName,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/signin", {
      usernameOrEmail: username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("wallet");
};

const verifyAccount = (userId) => {
  console.log("id", userId);
  return axios.put(API_URL + "/auth/verify/" + userId);
};
const sendMail = (email) => {
  return axios.post(API_URL + "/auth/forgot-password?email=" + email);
};

const resetPassword = (capcha, password) => {
  console.log({ capcha, password });
  return axios.post(API_URL + "/v1/users/reset-password", {
    token: capcha,
    password,
  });
};
const authService = {
  register,
  login,
  logout,
  sendMail,
  resetPassword,
  verifyAccount,
};

export default authService;

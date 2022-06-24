import axios from "axios";

const API_URL = "http://localhost:8080/api/";
const register = (username, password, email, firstName, lastName) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    password,
    email,
    firstName,
    lastName,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/signin", {
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
};
const sendMail = (email) => {
  return axios.post(API_URL + "auth/sendMail", {
    email,
  });
};

const setNewPassword = (email, password) => {
  return axios.post(API_URL + "auth/setNewPassword", {
    email,
    password,
  });
};
const authService = {
  register,
  login,
  logout,
  sendMail,
  setNewPassword,
};

export default authService;

import axios from "axios";

const API_URL = "http://localhost:8080/api";
// const API_URL = "http://jovinnserver.site/api";
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
  return axios.post(API_URL + "/v1/users/forgot_password/" + email);
};

const resetPassword = (capcha, password) => {
  console.log({ capcha, password });
  return axios.post(API_URL + "/v1/users/reset_password", {
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

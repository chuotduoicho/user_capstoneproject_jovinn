import axios from "axios";
import { API_PATH } from "../config";
import authHeader from "./auth-header";
// const API_URL = API_PATH + "/api/v1/users";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1/users";
const getUser = () => {
  return axios
    .get(API_URL + "/me", { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    });
};
const getWallet = () => {
  return axios
    .get(API_URL + "/wallet", { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      // localStorage.setItem("wallet", JSON.stringify(response.data));
      return response.data;
    });
};
const updateUserProfile = ({
  id,
  firstName,
  lastName,
  gender,
  birthDate,
  phone,
  address,
  city,
  avatar,
}) => {
  console.log({
    id,
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    address,
    city,
    avatar,
  });
  return axios
    .put(
      API_URL + "/profile/" + id,

      {
        firstName,
        lastName,
        gender,
        birthDate,
        phoneNumber: phone,
        country: address,
        city: city,
        avatar: avatar,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    });
};

const joinSeller = (obj) => {
  // const info = obj.info;
  // const userId = obj.userId;
  console.log("info", obj);
  return axios
    .post(
      API_URL + "/join-selling",

      obj,

      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response.data);
      // localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    });
};
const changePassword = (oldPassword, newPassword, confirmPassword) => {
  console.log({ oldPassword, newPassword, confirmPassword });
  return axios.put(
    API_URL + "/change-password",
    {
      oldPass: oldPassword,
      newPass: newPassword,
      rePass: confirmPassword,
    },
    { headers: authHeader() }
  );
};
const withdrawAddress = (obj) => {
  console.log("tien", obj);
  return axios
    .post(API_URL + "/add-withdraw-address", obj, { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
const withdraw = (obj) => {
  console.log("tien", obj);
  return axios
    .post(API_URL + "/withdrawal-money", obj, { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
const userService = {
  getUser,
  updateUserProfile,
  joinSeller,
  changePassword,
  getWallet,
  withdrawAddress,
  withdraw,
};

export default userService;

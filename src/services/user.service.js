import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/users";
const getTopSellers = () => {
  return axios
    .get("http://localhost:8080/api/v1/seller/sellers")
    .then((response) => {
      localStorage.setItem("topSeller", JSON.stringify(response.data));
      return response.data;
    });
};
const getUser = () => {
  return axios
    .get(API_URL + "/me", { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
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

const userService = {
  getTopSellers,
  getUser,
  updateUserProfile,
  joinSeller,
  changePassword,
};

export default userService;

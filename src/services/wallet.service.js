import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/payment";

const topup = (obj) => {
  console.log("tien", obj);
  return axios
    .post(
      API_URL,

      obj,

      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
const topupSuccess = (obj) => {
  console.log("tien", obj);
  return axios
    .get(API_URL + "/success" + obj, { headers: authHeader() })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
const walletService = {
  topup,
  topupSuccess,
};

export default walletService;

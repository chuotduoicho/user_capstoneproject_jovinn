import axios from "axios";
import { API_PATH } from "../config";
import authHeader from "./auth-header";
const API_URL = API_PATH + "/api/v1/payment";
// const API_URL = "http://jovinnserver.site/api/v1/payment";

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

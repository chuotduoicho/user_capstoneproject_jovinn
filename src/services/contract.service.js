import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1";

const addContract = (order) => {
  return axios
    .post(API_URL + "/contract", order, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const getAllContracts = () => {
  return axios
    .get(API_URL + "/contract/list-order", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("contracts", JSON.stringify(response.data));
      return response.data;
    });
};
const acceptOrder = (orderId) => {
  return axios
    .post(API_URL + "/seller/accept/", orderId, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const contractService = {
  addContract,
  getAllContracts,
  acceptOrder,
};

export default contractService;

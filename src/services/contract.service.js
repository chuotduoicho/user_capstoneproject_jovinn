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
const getContracts = () => {
  return axios
    .get(API_URL + "/contract/list-contract", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("listContracts", JSON.stringify(response.data));
      return response.data;
    });
};
const acceptOrder = (orderId) => {
  return axios
    .put(API_URL + "/contract/seller/accept/" + orderId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const acceptDeleveryContract = (orderId) => {
  return axios
    .put(API_URL + "/contract/delivery-accept/" + orderId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const uploadDeleveryContract = (orderId) => {
  return axios
    .post(
      API_URL + "/contract/delivery/" + orderId,
      {
        file: "dsfsdfsdf",
        description: "sadsafsdfdds",
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const rejectOrder = (orderId) => {
  return axios
    .put(API_URL + "/contract/seller/reject/" + orderId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const contractService = {
  addContract,
  getAllContracts,
  acceptOrder,
  getContracts,
  rejectOrder,
  acceptDeleveryContract,
  uploadDeleveryContract,
};

export default contractService;

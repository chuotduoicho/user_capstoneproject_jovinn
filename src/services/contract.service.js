import axios from "axios";
import { API_PATH } from "../config";
import authHeader from "./auth-header";
const API_URL = API_PATH + "/api/v1";
// const API_URL = "http://jovinnserver.site/api/v1";
const addContract = (order) => {
  return axios
    .post(API_URL + "/contract", order, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const delevery = (obj) => {
  const contractId = obj.contractId;
  const delevery = obj.delevery;
  return axios
    .post(
      API_URL + "/contract/delivery-for-milestone/" + contractId,
      delevery,
      {
        headers: authHeader(),
      }
    )
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
const getContractDetail = (obj) => {
  return axios
    .get(API_URL + "/contract/details/" + obj, { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("contracts", JSON.stringify(response.data));
      return response.data;
    });
};

const getContracts = () => {
  return axios
    .get(API_URL + "/contract/list-contract", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("contracts", JSON.stringify(response.data));
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
const acceptRequestBuyer = (obj) => {
  const requestId = obj.requestId;
  const sellerId = obj.sellerId;
  return axios
    .post(API_URL + "/contract/" + requestId + "/" + sellerId, null, {
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
const flagContract = (orderId) => {
  return axios
    .post(API_URL + "/contract/flag/" + orderId, null, {
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
  acceptRequestBuyer,
  getContractDetail,
  delevery,
  flagContract,
};

export default contractService;

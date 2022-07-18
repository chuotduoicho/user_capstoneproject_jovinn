import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/postRequest";

const addRequest = (request) => {
  return axios
    .post(API_URL + "/addPostRequest", request, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const addOffer = (request) => {
  const requestId = request.requestId;
  const requestobj = request.request;
  return axios
    .post(API_URL + "/send-offer/" + requestId, requestobj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const updateRequest = (obj) => {
  const requestId = obj.requestId;
  const request = obj.request;
  return axios
    .put(API_URL + "/updatePostRequest/" + requestId, request, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const applyRequest = (requestId) => {
  return axios
    .put(API_URL + "/sellerApplyRequest/" + requestId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getAllRequests = () => {
  return axios
    .get(API_URL + "/getAllPostRequest", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("requests", JSON.stringify(response.data));
      return response.data;
    });
};
const getAllSellerInvite = (requestId) => {
  return axios
    .get(API_URL + "/getSellerInvite", requestId, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const getAllRequestsByCate = (cateId) => {
  return axios
    .get(API_URL + "/getPostRequestByCategoryId/" + cateId, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getRequestsOfBuyer = () => {
  return axios
    .get(API_URL + "/getPostRequestByBuyerCreated", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("requests", JSON.stringify(response.data));
      return response.data;
    });
};
const requestService = {
  addRequest,
  addOffer,
  updateRequest,
  applyRequest,
  getAllRequests,
  getAllRequestsByCate,
  getRequestsOfBuyer,
  getAllSellerInvite,
};

export default requestService;

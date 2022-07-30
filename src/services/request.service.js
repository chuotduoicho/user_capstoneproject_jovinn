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
  const offerObj = request.offer;
  return axios
    .post(API_URL + "/send-offer/" + requestId, offerObj, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const updateOffer = (obj) => {
  const offerId = obj.offerId;
  const offerObj = obj.offer;
  return axios
    .put(API_URL + "/updatePostRequest/" + offerId, offerObj, {
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
const applyOffer = (obj) => {
  return axios
    .post("http://localhost:8080/api/v1/contract/" + obj, null, {
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
    .get(API_URL + "/getListSellerApply/" + requestId, {
      headers: authHeader(),
    })
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

const getOffersOfBuyer = (requestId) => {
  return axios
    .get("http://localhost:8080/api/v1/users/list-offer/" + requestId, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getOffersOfSeller = () => {
  return axios
    .get("http://localhost:8080/api/v1/seller/list-offer", {
      headers: authHeader(),
    })
    .then((response) => {
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
  getOffersOfBuyer,
  getOffersOfSeller,
  applyOffer,
};

export default requestService;

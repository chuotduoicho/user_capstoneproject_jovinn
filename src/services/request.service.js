import axios from "axios";
import { API_PATH } from "../config";
import authHeader from "./auth-header";
const API_URL = API_PATH + "/api/v1";
// const API_URL = "http://jovinnserver.site/api/v1";
const addRequest = (request) => {
  return axios
    .post(API_URL + "/postRequest/addPostRequest", request, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const addOffer = (request) => {
  const requestId = request.requestId;
  const offerObj = request.offer;
  return axios
    .post(API_URL + "/postRequest/send-offer/" + requestId, offerObj, {
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
    .put(API_URL + "/postRequest/updatePostRequest/" + offerId, offerObj, {
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
    .put(API_URL + "/postRequest/updatePostRequest/" + requestId, request, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const applyRequest = (requestId) => {
  return axios
    .put(API_URL + "/postRequest/sellerApplyRequest/" + requestId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const applyOffer = (obj) => {
  return axios
    .post(API_URL + "/contract/" + obj, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getAllRequests = () => {
  return axios
    .get(API_URL + "/postRequest/getAllPostRequest", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("requests", JSON.stringify(response.data));
      return response.data;
    });
};
const getAllSellerInvite = (requestId) => {
  return axios
    .get(API_URL + "/postRequest/getListSellerApply/" + requestId, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getAllRequestsByCate = (cateId) => {
  return axios
    .get(API_URL + "/postRequest/getPostRequestByCategoryId/" + cateId, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const getRequestsOfBuyer = () => {
  return axios
    .get(API_URL + "/postRequest/getPostRequestByBuyerCreated", {
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("requests", JSON.stringify(response.data));
      return response.data;
    });
};

const getOffersOfBuyer = (requestId) => {
  return axios
    .get(API_URL + "/users/list-offer/" + requestId, {
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("offers", JSON.stringify(response.data));
      return response.data;
    });
};

const getOffersOfSeller = () => {
  return axios
    .get(API_URL + "/seller/list-offer", {
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("offers", JSON.stringify(response.data));
      return response.data;
    });
};

const getTargetSeller = (targetSellerRequest) => {
  return axios
    .post(API_URL + "/get-ten-seller-target", targetSellerRequest, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getRequestDetail = (postRequestId) => {
  return axios
    .get(API_URL + "/postRequest/details/" + postRequestId, {
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("postRequestDetail", JSON.stringify(response.data));
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
  getTargetSeller,
  getRequestDetail,
};

export default requestService;

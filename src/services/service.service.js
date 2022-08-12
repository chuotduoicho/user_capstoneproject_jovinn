import axios from "axios";
import { API_PATH } from "../config";
import authHeader from "./auth-header";

const API_URL = API_PATH + "/api/v1";
// const API_URL = "http://jovinnserver.site/api/v1";
const getAllServices = () => {
  return axios.get(API_URL + "/box/box-services").then((response) => {
    localStorage.setItem("services", JSON.stringify(response.data));
    return response.data;
  });
};
// const API_URL = "http://jovinnserver.site/api/v1";
const getRating = (serviceId) => {
  return axios
    .get(API_URL + "/box/rating-list/" + serviceId)
    .then((response) => {
      localStorage.setItem("services", JSON.stringify(response.data));
      return response.data;
    });
};
const get8ServicesImpression = () => {
  return axios.get(API_URL + "/box/top-8-impression").then((response) => {
    localStorage.setItem("servicesImpression", JSON.stringify(response.data));
    return response.data;
  });
};
const get8ServicesImpressionByCate = (cateId) => {
  return axios
    .get(API_URL + "/box/top-8-impression/" + cateId)
    .then((response) => {
      localStorage.setItem("servicesImpression", JSON.stringify(response.data));
      return response.data;
    });
};
const getServices = (obj) => {
  console.log("request", obj);
  return axios
    .post(API_URL + "/box/search-and-filter", obj)
    .then((response) => {
      localStorage.setItem("services", JSON.stringify(response.data));
      return response.data;
    });
};
const getServicesSeller = (obj) => {
  const sellerId = obj.sellerId;
  const params = obj.obj;
  console.log("request", obj);
  return axios
    .get(API_URL + "/box/list-service-by-sellerId/" + sellerId, {
      params: params,
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("services", JSON.stringify(response.data));
      return response.data;
    });
};
const getServicesSearchFilter = (obj) => {
  const search = obj.search;
  const params = obj.obj;
  console.log(search, params);
  return axios
    .get(API_URL + "/box/search/" + search, { params: params })
    .then((response) => {
      localStorage.setItem("services", JSON.stringify(response.data));
      return response.data;
    });
};
const getServicesHistory = () => {
  return axios
    .get(API_URL + "/box/list-box-history", {
      headers: authHeader(),
    })
    .then((response) => {
      localStorage.setItem("servicesHistory", JSON.stringify(response.data));
      return response.data;
    });
};
const getServiceById = (serviceId) => {
  return axios
    .get(API_URL + "/box/box-details-guest/" + serviceId)
    .then((response) => {
      localStorage.setItem("serviceDetail", JSON.stringify(response.data));
      return response.data;
    });
};
const getServiceByCateId = (cateId) => {
  return axios
    .get(API_URL + "/box/list-services-by-cat/" + cateId)
    .then((response) => {
      return response.data;
    });
};
const addService = (service) => {
  return axios
    .post(API_URL + "/box/add-box-service", service, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateService = (obj) => {
  const service = obj.service;
  const serviceId = obj.serviceId;
  console.log(service, serviceId);
  return axios
    .put(API_URL + "/box/update-service?id=" + serviceId, service, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const pauseService = (serviceId) => {
  return axios
    .put(API_URL + "/box/update-status/" + serviceId, null, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const deleteService = (obj) => {
  return axios
    .delete(API_URL + "/box/delete-service/" + obj, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateServicePackage = (obj) => {
  console.log("package", obj);
  const packageId = obj.packId;
  const pack = obj.pack;
  return axios
    .put(API_URL + "/package/" + packageId, pack, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const addServicePackage = (obj) => {
  console.log("package", obj);
  const boxId = obj.serviceId;
  const pack = obj.pack;
  return axios
    .post(API_URL + "/package/" + boxId, pack, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const deleteServicePackage = (obj) => {
  return axios
    .delete(API_URL + "/package/" + obj, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const serviceService = {
  getAllServices,
  getServiceById,
  addService,
  getServiceByCateId,
  updateService,
  updateServicePackage,
  addServicePackage,
  deleteServicePackage,
  getServices,
  get8ServicesImpression,
  get8ServicesImpressionByCate,
  getServicesSearchFilter,
  getServicesSeller,
  getRating,
  pauseService,
  deleteService,
};

export default serviceService;

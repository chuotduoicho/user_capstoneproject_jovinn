import axios from "axios";
import { object } from "prop-types";
import authHeader from "./auth-header";
// const API_URL = "http://localhost:8080/api/v1";
const API_URL = "http://jovinnserver.site/api/v1";
const getAllServices = () => {
  return axios.get(API_URL + "/box/box-services").then((response) => {
    localStorage.setItem("services", JSON.stringify(response.data));
    return response.data;
  });
};
const getServiceById = (serviceId) => {
  return axios
    .get(API_URL + "/box/serviceDetail/" + serviceId)
    .then((response) => {
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
};

export default serviceService;

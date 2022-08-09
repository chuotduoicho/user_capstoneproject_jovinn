import axios from "axios";
import { object } from "prop-types";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1";
// const API_URL = "http://jovinnserver.site/api/v1";
const getAllServices = () => {
  return axios.get(API_URL + "/box/box-services").then((response) => {
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
  return axios.get(API_URL + "/box/search", obj).then((response) => {
    localStorage.setItem("services", JSON.stringify(response.data));
    return response.data;
  });
};
const getServicesSearchFilter = (obj) => {
  const search = obj.search;
  const page = obj.page;
  const categoryId = obj.categoryId;
  const subCategoryId = obj.subCategoryId;
  const minPrice = obj.minPrice;
  const maxPrice = obj.maxPrice;
  const ratingPoint = obj.ratingPoint;
  const sortBy = obj.sortBy;
  const sortDir = obj.sortDir;
  return axios
    .get(
      API_URL +
        "/box/search/" +
        search +
        "?page=" +
        page +
        "&categoryId=" +
        categoryId +
        "&subCategoryId=" +
        subCategoryId +
        "&minPrice=" +
        minPrice +
        "&maxPrice=" +
        maxPrice +
        "&ratingPoint=" +
        ratingPoint +
        "&sortBy=" +
        sortBy +
        "&sortDir=" +
        sortDir
    )
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
  getServices,
  get8ServicesImpression,
  get8ServicesImpressionByCate,
  getServicesSearchFilter,
};

export default serviceService;

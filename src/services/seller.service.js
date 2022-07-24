import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/seller";
const updateDescriptionBio = ({ descriptionBio }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/profile",

    {
      descriptionBio,
    },
    { headers: authHeader() }
  );
};
const updateSkill = ({ descriptionBio }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/profile",

    {
      descriptionBio,
    },
    { headers: authHeader() }
  );
};
const updateCertificate = ({ descriptionBio }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/profile",

    {
      descriptionBio,
    },
    { headers: authHeader() }
  );
};
const updateEducation = ({ descriptionBio }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/profile",

    {
      descriptionBio,
    },
    { headers: authHeader() }
  );
};
const getOffersSeller = (id) => {
  return axios
    .get(API_URL + "/list-offer/" + id, null, { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("requests", JSON.stringify(response.data));
      return response.data;
    });
};
const sellerService = {
  updateDescriptionBio,
  getOffersSeller,
  updateSkill,
  updateCertificate,
  updateEducation,
};

export default sellerService;

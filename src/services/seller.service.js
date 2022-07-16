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

const sellerService = { updateDescriptionBio };

export default sellerService;

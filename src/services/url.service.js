import axios from "axios";
const API_URL = "localhost:8080/api/v1/files/";

const uploadFile = (obj) => {
  return axios.post(API_URL, obj).then((response) => {
    return response.data;
  });
};
const urlService = {
  uploadFile,
};

export default urlService;

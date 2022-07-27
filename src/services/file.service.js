import axios from "axios";
const API_URL = "34.209.109.181:9091/api/v1/files";

const uploadFile = (obj) => {
  return axios
    .post(API_URL, obj, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const fileService = {
  uploadFile,
};

export default fileService;

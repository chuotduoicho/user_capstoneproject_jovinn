import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/files/";

const uploadFile = (obj) => {
  return axios
    .put(API_URL, obj, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};
const urlService = {
  uploadFile,
};

export default urlService;

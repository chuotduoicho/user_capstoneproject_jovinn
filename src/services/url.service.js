import axios from "axios";
import { API_PATH } from "../config";
// const API_URL = API_PATH + "/api/v1/files/";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1/files/";
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

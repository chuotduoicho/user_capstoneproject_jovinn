import axios from "axios";
import { API_PATH } from "../config";
const API_URL = API_PATH + "/api/v1/files/";
// const API_URL = "http://jovinnserver.site/api/v1/files/";
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

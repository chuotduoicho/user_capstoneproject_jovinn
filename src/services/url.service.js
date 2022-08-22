import axios from "axios";

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

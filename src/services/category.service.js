import axios from "axios";
import { API_PATH } from "../config";

const API_URL = API_PATH + "/api/v1";
// const API_URL = "http://jovinnserver.site/api/v1";
const getAllCategories = () => {
  return axios.get(API_URL + "/categories").then((response) => {
    localStorage.setItem("categories", JSON.stringify(response.data));
    return response.data;
  });
};
const categoryService = { getAllCategories };

export default categoryService;

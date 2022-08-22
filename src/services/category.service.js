import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1";
const getAllCategories = () => {
  return axios.get(API_URL + "/categories").then((response) => {
    localStorage.setItem("categories", JSON.stringify(response.data));
    return response.data;
  });
};
const getAllSkills = () => {
  return axios.get(API_URL + "/skill/meta-data-list").then((response) => {
    // localStorage.setItem("skills", JSON.stringify(response.data));
    return response.data;
  });
};
const categoryService = { getAllCategories, getAllSkills };

export default categoryService;

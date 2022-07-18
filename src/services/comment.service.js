import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/comment";

const addComment = (id, text) => {
  return axios
    .post(API_URL + "/" + id, text, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateComment = (id, text) => {
  return axios
    .put(API_URL + "/" + id, text, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const deleteComment = (id) => {
  return axios
    .delete(API_URL + "/", id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const commentService = {
  addComment,
  updateComment,
  deleteComment,
};

export default commentService;

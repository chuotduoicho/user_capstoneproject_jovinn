import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1/comment";

const addComment = (obj) => {
  const id = obj.contractId;
  const text = obj.text;
  console.log(id);
  console.log(text);
  return axios
    .post(API_URL + "/" + id, { text }, { headers: authHeader() })
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
const addRating = (obj) => {
  const id = obj.contractId;
  const body = obj.obj;
  console.log(id);
  console.log(body);
  return axios
    .post("http://localhost:8080/api/v1/contract/rating/" + id, body, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const commentService = {
  addComment,
  updateComment,
  deleteComment,
  addRating,
};

export default commentService;

import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1";
const addComment = (obj) => {
  const id = obj.contractId;
  const text = obj.text;
  console.log(id);
  console.log(text);
  return axios
    .post(API_URL + "/comment/" + id, { text }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
const updateComment = (id, text) => {
  return axios
    .put(API_URL + "/comment/" + id, text, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const deleteComment = (id) => {
  return axios
    .delete(API_URL + "/comment/" + id, { headers: authHeader() })
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
    .post(API_URL + "/contract/rating/" + id, body, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const listComment = (obj) => {
  return axios.get(API_URL + "/contract/comments/" + obj).then((response) => {
    return response.data;
  });
};
const commentService = {
  addComment,
  updateComment,
  deleteComment,
  addRating,
  listComment,
};

export default commentService;

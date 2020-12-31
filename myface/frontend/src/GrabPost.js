import axios from "axios";

const API_URL = "http://localhost:8000";

export const getPosts = () => {
  const url = `/api/post/`;
  return axios.get(url).then((response) => response.data);
};

export const getPostByURL = (link) => {
  const url = `${API_URL}${link}`;
  return axios.get(url).then((response) => response.data);
};

export const getPost = (pk) => {
  const url = `${API_URL}/api/post/${pk}`;
  return axios.get(url).then((response) => response.data);
};

export const deletePost = (post) => {
  const url = `${API_URL}/api/post/${post.pk}`;
  return axios.delete(url);
};

export const createPost = (post) => {
  const url = `${API_URL}/api/post/`;
  return axios.post(url, post);
};

export const updatePost = (post) => {
  const url = `${API_URL}/api/post/${post.pk}`;
  return axios.put(url, post);
};

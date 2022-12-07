import axios from "axios";
import { getToken } from "../../utils/token";

axios.defaults.headers["Authorization"] = `Bearer ${getToken()}`;

export const add = (form) => {
  return axios.post("http://localhost:3000/book/add", form);
};

export const list = (params) => {
  return axios.get("http://localhost:3000/book/list", {
    params,
  });
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/book/${id}`);
};

export const updateCount = (data = {}) => {
  return axios.post("http://localhost:3000/book/updateCount", data);
};

export const update = (data = {}) => {
  return axios.post("http://localhost:3000/book/update", data);
};

export const detail = (id) => {
  return axios.get(`http://localhost:3000/book/detail/${id}`);
};

// 上传 excel
export const addMany = (key) => {
  return axios.post("http://localhost:3000/book/addMany", {
    key,
  });
};

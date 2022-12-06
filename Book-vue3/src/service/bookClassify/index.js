import axios from "axios";

export const list = () => {
  return axios.get("http://localhost:3000/bookClassify/list");
};

export const add = (title) => {
  return axios.post("http://localhost:3000/bookClassify/add", {
    title,
  });
};

export const update = (id, title) => {
  return axios.post("http://localhost:3000/bookClassify/update/title", {
    id,
    title,
  });
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/bookClassify/${id}`);
};

import axios from "axios";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page, size) => {
  return axios.get("http://localhost:3000/forgetPassword/list", {
    params: {
      page,
      size,
    },
  });
};

export const add = (account) => {
  return axios.post("http://localhost:3000/forgetPassword/add", {
    account,
  });
};

export const update = (id, status) => {
  return axios.post("http://localhost:3000/forgetPassword/update/status", {
    id,
    status,
  });
};

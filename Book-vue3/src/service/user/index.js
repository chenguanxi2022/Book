import axios from "axios";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page = 1, size = 5, keyWord = "") => {
  return axios.get("http://localhost:3000/user/list", {
    params: {
      page,
      size,
      keyWord,
    },
  });
};

// 删除
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/user/${id}`);
};

// 添加
export const add = (account, password, character) => {
  return axios.post("http://localhost:3000/user/add", {
    account,
    password,
    character,
  });
};

// resetPassword
export const resetPassword = (id) => {
  return axios.post("http://localhost:3000/user/reset/password", {
    id,
  });
};

export const info = () => {
  return axios.get("http://localhost:3000/user/info");
};

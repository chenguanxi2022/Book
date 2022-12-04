import axios from "axios";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page, size) => {
  return axios.get("http://localhost:3000/diary/list", {
    params: {
      page,
      size,
    },
  });
};

export const remove = (id) => {
  return axios.post("http://localhost:3000/diary/delete", {
    id,
  });
};

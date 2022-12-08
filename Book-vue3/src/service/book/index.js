import { get, post, del } from "../../utils/request";

export const add = (form) => {
  return post("/book/add", form);
};

export const list = (data) => {
  return get("/book/list", {
    data,
  });
};

export const remove = (id) => {
  return del(`/book/${id}`);
};

export const updateCount = (data = {}) => {
  return post("/book/updateCount", data);
};

export const update = (data = {}) => {
  return post("/book/update", data);
};

export const detail = (id) => {
  return get(`/book/detail/${id}`);
};

// 上传 excel
export const addMany = (key) => {
  return post("/book/addMany", {
    key,
  });
};

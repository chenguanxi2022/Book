import { get, post } from "../../utils/request";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page, size) => {
  return get("/forgetPassword/list", {
    page,
    size,
  });
};

export const add = (account) => {
  return post("/forgetPassword/add", {
    account,
  });
};

export const update = (id, status) => {
  return post("/forgetPassword/update/status", {
    id,
    status,
  });
};

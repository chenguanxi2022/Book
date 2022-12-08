import { get, post, del } from "../../utils/request";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page = 1, size = 5, keyWord = "") => {
  return get("/user/list", {
    page,
    size,
    keyWord, 
  });
};

// 删除
export const remove = (id) => {
  return del(`/user/${id}`);
};

// 添加
export const add = (account, password, character) => {
  return post("/user/add", {
    account,
    password,
    character,
  });
};

// resetPassword
export const resetPassword = (id) => {
  return post("/user/reset/password", {
    id,
  });
};

export const info = () => {
  return get("/user/info");
};

// 上传 excel
export const addMany = (key) => {
  return post("/user/addMany", {
    key,
  });
};

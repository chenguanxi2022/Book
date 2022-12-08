import { get, post } from "../../utils/request";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (page, size) => {
  return get("/diary/list", {
    page,
    size,
  });
};

export const remove = (id) => {
  return post("/diary/delete", {
    id,
  });
};

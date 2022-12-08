import { get } from "../../utils/request";

// get 请求，params 可以帮助我们自动拼接在 URL 上
export const list = (type = "1", page = 1, size = 10) => {
  return get("/log/list", {
    type,
    page,
    size,
  });
};

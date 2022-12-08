import { get, post, del } from "../../utils/request";

export const list = () => {
  return get("/bookClassify/list");
};

export const add = (title) => {
  return post("/bookClassify/add", {
    title,
  });
};

export const update = (id, title) => {
  return post("/bookClassify/update/title", {
    id,
    title,
  });
};

export const remove = (id) => {
  return del(`/bookClassify/${id}`);
};

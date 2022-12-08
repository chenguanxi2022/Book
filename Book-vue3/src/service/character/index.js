import { get, post } from "../../utils/request";

export const list = () => {
  return get("/character/list");
};

export const edit = (character, userId) => {
  return post("/character/update", {
    character,
    userId,
  });
};

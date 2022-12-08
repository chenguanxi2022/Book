import { post } from "../../utils/request";

export const resetPwd = (password, oldPwd) => {
  return post("/profile/update/password", {
    password,
    oldPwd,
  });
};

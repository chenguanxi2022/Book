import axios from "axios";

export const resetPwd = (password, oldPwd) => {
  return axios.post("http://localhost:3000/profile/update/password", {
    password,
    oldPwd,
  });
};

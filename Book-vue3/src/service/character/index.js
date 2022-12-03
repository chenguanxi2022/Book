import axios from "axios";

export const list = () => {
  return axios.get("http://localhost:3000/character/list");
};

export const edit = (character, userId) => {
  return axios.post("http://localhost:3000/character/update", {
    character,
    userId,
  });
};

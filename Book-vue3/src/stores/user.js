import { ref } from "vue";
import { defineStore } from "pinia";
import { user } from "../service";
import { result } from "../utils";
import { getCharacterInfoById } from "../character";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});
  const userCharacter = ref("");

  const setUserInfo = (data) => {
    userInfo.value = data;
  };
  const setUserCharacter = (data) => {
    userCharacter.value = data;
  };
  const getUserInfo = async () => {
    const res = await user.info();

    result(res).success(({ data }) => {
      setUserInfo(data);
      setUserCharacter(getCharacterInfoById(data.character));
    });
  };

  return {
    setUserInfo,
    userInfo,
    userCharacter,
    setUserCharacter,
    getUserInfo,
  };
});

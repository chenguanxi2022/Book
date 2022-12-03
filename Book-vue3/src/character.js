import { useCharacterStore } from "./stores/character";

export const getCharacterInfoById = (id) => {
  const { characterInfo } = useCharacterStore();

  const one = characterInfo.find((item) => item._id === id);

  return (
    one || {
      title: "未知角色",
    }
  );
};

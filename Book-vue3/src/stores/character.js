/**
 * ref state
 * computed getters
 * function actions
 */

import { ref } from "vue";
import { defineStore } from "pinia";
import { character } from "../service";
import { result } from "../utils";

export const useCharacterStore = defineStore("character", () => {
  const characterInfo = ref([]);

  const getList = async () => {
    const res = await character.list();

    result(res).success(({ data }) => {
      characterInfo.value = data;
    });
  };

  return { characterInfo, getList };
});

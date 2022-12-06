import { ref } from "vue";
import { defineStore } from "pinia";
import { bookClassify } from "../service";
import { result } from "../utils";

export const useBookClassifyStore = defineStore("bookClassify", () => {
  const bookClassifyList = ref([]);

  const getBookClassify = async () => {
    const res = await bookClassify.list();

    result(res).success(({ data }) => {
      bookClassifyList.value = data;
    });
  };

  return { getBookClassify, bookClassifyList };
});

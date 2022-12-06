<template>
  <div>
    <a-modal
      :visible="props.isShow"
      title="添加书籍"
      @ok="submit"
      @cancel="close"
    >
      <!-- form -->
      <a-form :model="editForm" :label-col="{ span: 6 }">
        <!-- 书名 -->
        <a-form-item label="书名">
          <a-input v-model:value="editForm.name" placeholder="书名" />
        </a-form-item>
        <!-- 价格 -->
        <a-form-item label="价格">
          <a-input-number
            id="inputNumber"
            v-model:value="editForm.price"
            :min="1"
            :max="999"
            placeholder="价格"
          />
        </a-form-item>
        <!-- 作者 -->
        <a-form-item label="作者">
          <a-input v-model:value="editForm.author" placeholder="作者" />
        </a-form-item>
        <!-- 出版日期 -->
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="editForm.date" placeholder="出版日期" />
        </a-form-item>
        <!-- 分类 -->
        <a-form-item label="分类">
          <a-select v-model:value="editForm.classify" style="width: 120px">
            <a-select-option
              v-for="item in store.bookClassifyList"
              :key="item._id"
              v-model:value="item._id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <!-- 库存 -->
        <!-- <a-form-item label="库存">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.count"
            :min="0"
            :max="9999"
            placeholder="库存"
          />
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { book } from "../../../service/";
import { result } from "../../../utils";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
import { useBookClassifyStore } from "../../../stores/bookClassify";

const store = useBookClassifyStore();
// props
const props = defineProps({
  isShow: Boolean,
  curBook: Object,
});
// emits
const emits = defineEmits(["update:isShow", "getList"]);
// 控制 isShow（v-model双向绑定）
const close = () => {
  return emits("update:isShow", false);
};
// 刷新书籍信息
const refresh = () => {
  return emits("getList");
};
// const defaultFormState = {
//   name: "",
//   price: "",
//   author: "",
//   date: "",
//   classify: "",
//   count: "",
// };
// eslint-disable-next-line no-undef
const editForm = reactive({
  name: "",
  price: "",
  author: "",
  date: "",
  classify: "",
});
// 监听
// eslint-disable-next-line no-undef
watch(
  () => props.curBook,
  (current) => {
    Object.assign(editForm, current);
    editForm.date = dayjs(Number(editForm.date));
  },
  {
    deep: true,
  }
);
const submit = async () => {
  const res = await book.update({
    id: props.curBook._id,
    name: editForm.name,
    price: editForm.price,
    author: editForm.author,
    classify: editForm.classify,
    date: editForm.date.valueOf(),
  });

  result(res).success(({ msg }) => {
    message.success(msg);
    refresh();
    close();
  });
};
// const formState = reactive(clone(defaultFormState));
// 确定
// const submit = async () => {
//   // 深拷贝，复制一份 formState
//   const form = clone(formState);
//   form.date = formState.date.valueOf();
//   const res = await book.add(form);

//   // 判断响应
//   result(res).success((d, { data }) => {
//     // 合并对象（清空数据）
//     Object.assign(formState, defaultFormState);
//     message.success(data.msg);
//     close();
//     refresh();
//   });
// };
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <a-modal
      :visible="props.isShow"
      title="添加书籍"
      @ok="submit"
      @cancel="close"
    >
      <!-- form -->
      <a-form :model="formState" :label-col="{ span: 6 }">
        <!-- 书名 -->
        <a-form-item label="书名">
          <a-input v-model:value="formState.name" placeholder="书名" />
        </a-form-item>
        <!-- 价格 -->
        <a-form-item label="价格">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.price"
            :min="1"
            :max="999"
            placeholder="价格"
          />
        </a-form-item>
        <!-- 作者 -->
        <a-form-item label="作者">
          <a-input v-model:value="formState.author" placeholder="作者" />
        </a-form-item>
        <!-- 出版日期 -->
        <a-form-item label="出版日期">
          <a-date-picker
            v-model:value="formState.date"
            placeholder="出版日期"
          />
        </a-form-item>
        <!-- 分类 -->
        <a-form-item label="分类">
          <a-input v-model:value="formState.classify" placeholder="分类" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { book } from "../../../service/";
import { result, clone } from "../../../utils";
import { message } from "ant-design-vue";
// props
const props = defineProps({
  isShow: Boolean,
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
const defaultFormState = {
  name: "",
  price: "",
  author: "",
  date: "",
  classify: "",
};
// eslint-disable-next-line no-undef
const formState = reactive(clone(defaultFormState));
// 确定
const submit = async () => {
  // 深拷贝，复制一份 formState
  const form = clone(formState);
  form.date = formState.date.valueOf();
  const res = await book.add(form);

  // 判断响应
  result(res).success((d, { data }) => {
    // 合并对象（清空数据）
    Object.assign(formState, defaultFormState);
    message.success(data.msg);
    close();
    refresh();
  });
};
</script>

<style scoped lang="scss"></style>

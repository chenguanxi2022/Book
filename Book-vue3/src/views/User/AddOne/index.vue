<template>
  <div>
    <a-modal
      :visible="props.isShow"
      title="添加一个用户"
      @ok="submit"
      @cancel="close"
    >
      <!-- form -->
      <a-form :model="formState" :label-col="{ span: 6 }">
        <!-- 账号 -->
        <a-form-item label="账号">
          <a-input v-model:value="formState.account" placeholder="账号" />
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="密码">
          <a-input
            v-model:value="formState.password"
            placeholder="密码"
            type="password"
          />
        </a-form-item>
        <!-- 权限 -->
        <a-form-item label="角色">
          <a-select v-model:value="formState.character" style="width: 120px">
            <a-select-option
              v-for="item in characterInfo"
              :key="item._id"
              v-model:value="item._id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { user } from "../../../service/";
import { result, clone } from "../../../utils";
import { message } from "ant-design-vue";
import { useCharacterStore } from "../../../stores/character";

// store
const store = useCharacterStore();
// characterInfo
const { characterInfo } = store;
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
  account: "",
  password: "",
  character: "",
};
// eslint-disable-next-line no-undef
const formState = reactive(clone(defaultFormState));
formState.character = characterInfo[1]._id;
// 确定
const submit = async () => {
  // 深拷贝，复制一份 formState
  const form = clone(formState);

  const res = await user.add(form.account, form.password, form.character);

  // 判断响应
  result(res).success(({ msg }) => {
    // 合并对象（清空数据）
    Object.assign(formState, defaultFormState);
    message.success(msg);
    close();
    refresh();
  });
};
</script>

<style scoped lang="scss"></style>

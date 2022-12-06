<template>
  <div>
    <a-card>
      <!-- title -->
      <h2>修改密码</h2>
      <a-divider />
      <a-form
        :model="resetPwdForm"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <!-- 原始密码 -->
        <a-form-item label="原始密码">
          <a-input-password
            v-model:value="resetPwdForm.oldPwd"
            placeholder="请输入原始密码"
          />
        </a-form-item>
        <!-- 新密码 -->
        <a-form-item label="新密码">
          <a-input-password
            v-model:value="resetPwdForm.newPwd"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <!-- 确认密码 -->
        <a-form-item label="确认新密码">
          <a-input-password
            v-model:value="resetPwdForm.confirmPwd"
            placeholder="请再次输入新密码"
          />
          <div style="margin-top: 24px" />
          <a-button type="primary" @click="resetPwd">确认修改</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { profile } from "../../service";
import { result } from "../../utils";

const resetPwdForm = reactive({
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

const resetPwd = async () => {
  // 再次确认密码
  if (resetPwdForm.confirmPwd !== resetPwdForm.newPwd) {
    message.error("两次输入的密码不一致");
    return;
  }

  const res = await profile.resetPwd(resetPwdForm.newPwd, resetPwdForm.oldPwd);

  result(res).success(({ msg }) => {
    message.success(msg);
    resetPwdForm.newPwd = "";
    resetPwdForm.oldPwd = "";
    resetPwdForm.confirmPwd = "";
  });
};
</script>

<style scoped></style>

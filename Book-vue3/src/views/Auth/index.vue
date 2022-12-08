<template>
  <div class="auth">
    <!-- bg -->
    <div class="bg"></div>
    <!-- info -->
    <div class="auth-info">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fu.candou.com%2F2015%2F0831%2F1441006447471.png%3FimageView2%2F2%2Fw%2F388%2Fh%2F416&refer=http%3A%2F%2Fu.candou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672031780&t=cb15db1afe50157d22a7f5d59dd2f9be"
        alt=""
      />
      <h2>图书管理系统</h2>
    </div>
    <!-- form -->
    <div class="auth-form">
      <a-tabs>
        <!-- 登陆 -->
        <a-tab-pane key="1" tab="登陆">
          <!-- 用户名 -->
          <div class="auth-form-item">
            <a-input
              size="large"
              placeholder="用户名"
              v-model:value="logForm.account"
            >
              <template #prefix>
                <github-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- 密码 -->
          <div class="auth-form-item">
            <a-input-password
              size="large"
              placeholder="密码"
              v-model:value="logForm.password"
              type="password"
            >
              <template #prefix>
                <lock-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input-password>
          </div>
          <!-- 忘记密码 -->
          <a href="javascript:;" @click="forgetPassword"
            ><div class="auth-form-item">忘记密码</div></a
          >
          <!-- Button -->
          <div class="auth-form-item">
            <a-button size="large" class="button" type="primary" @click="login"
              >登陆</a-button
            >
          </div>
        </a-tab-pane>
        <!-- 注册 -->
        <a-tab-pane key="2" tab="注册">
          <!-- 用户名 -->
          <div class="auth-form-item">
            <a-input
              size="large"
              placeholder="用户名"
              v-model:value="regForm.account"
            >
              <template #prefix>
                <github-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- 密码 -->
          <div class="auth-form-item">
            <a-input-password
              size="large"
              placeholder="密码"
              v-model:value="regForm.password"
              type="password"
            >
              <template #prefix>
                <lock-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input-password>
          </div>
          <!-- 邀请码 -->
          <div class="auth-form-item">
            <a-input
              size="large"
              placeholder="邀请码"
              v-model:value="regForm.inviteCode"
            >
              <template #prefix>
                <mail-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- Button -->
          <div class="auth-form-item">
            <a-button
              size="large"
              class="button"
              type="primary"
              @click="register"
              >注册</a-button
            >
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import {
  GithubOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { auth, resetPassword } from "../../service";
import { result } from "../../utils";
import { useUserStore } from "../../stores/user";
import { getCharacterInfoById } from "../../character";
import { useRouter } from "vue-router";
import { setToken } from "../../utils/token";
import { createVNode } from "vue";

// router
const router = useRouter();
// stroe
const store = useUserStore();
// eslint-disable-next-line no-undef
const regForm = reactive({
  account: "",
  password: "",
  inviteCode: "",
});
// register
const register = async () => {
  if (regForm.account === "") {
    message.warn("用户名不可为空");
    // 记住一定要 return 掉，不然还会走下面的逻辑
    return;
  }
  if (regForm.password === "") {
    message.warn("密码不可为空");
    return;
  }
  if (regForm.inviteCode === "") {
    message.warn("邀请码不可为空");
    return;
  }
  // 获取响应数据
  const res = await auth.register(
    regForm.account,
    regForm.password,
    regForm.inviteCode
  );
  result(res).success((data) => {
    message.success(data.msg);
  });
  // 判断 code
  // if (data.code) {
  //   message.success(data.msg);
  // } else {
  //   message.error(data.msg);
  // }
};
// eslint-disable-next-line no-undef
const logForm = reactive({
  account: "",
  password: "",
});
// login
const login = async () => {
  if (logForm.account === "") {
    message.warn("用户名不可为空");
    // 记住一定要 return 掉，不然还会走下面的逻辑
    return;
  }
  if (logForm.password === "") {
    message.warn("密码不可为空");
    return;
  }
  const res = await auth.login(logForm.account, logForm.password);
  result(res).success(async ({ msg, data: { data, token } }) => {
    message.success(msg);

    // 保存在 localStorage 中
    setToken(token);

    await store.getUserInfo();

    store.setUserInfo(data);
    store.setUserCharacter(getCharacterInfoById(data.character));

    router.replace("/book");
  });
  // 判断 code
  // if (data.code) {
  //   message.success(data.msg);
  // } else {
  //   message.error(data.msg);
  // }
};
// forgetPassword
const forgetPassword = () => {
  Modal.confirm({
    title: "输入账号发起请求，管理员会审核",
    content: createVNode("input", { class: "forget-password-count" }),
    onOk: async () => {
      const el = document.querySelector(".forget-password-count");
      let account = el.value;

      const res = await resetPassword.add(account);

      result(res).success(({ msg }) => {
        message.success(msg);
      });
    },
  });
};
</script>

<style scoped lang="scss">
:deep(.ant-input-prefix) {
  margin-right: 10px;
}
.bg {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url(https://static.zhihu.com/heifetz/assets/sign_bg.47eec442.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  opacity: 0.2;
  z-index: -1;
}
.auth {
  z-index: 999;
  margin-top: 100px;
  &-info {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    h2 {
      margin: 0;
      font-size: 26px;
    }
  }
  &-form {
    width: 400px;
    margin: 0 auto;
    &-item {
      margin-bottom: 20px;
    }
    .button {
      width: 100%;
    }
  }
}
</style>

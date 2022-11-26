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
            <a-input size="large" placeholder="用户名">
              <template #prefix>
                <github-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- 密码 -->
          <div class="auth-form-item">
            <a-input size="large" placeholder="密码">
              <template #prefix>
                <lock-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- 忘记密码 -->
          <a href="javascript:;"><div class="auth-form-item">忘记密码</div></a>
          <!-- Button -->
          <div class="auth-form-item">
            <a-button size="large" class="button" type="primary">登陆</a-button>
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
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="regForm.password"
            >
              <template #prefix>
                <lock-outlined :style="{ fontSize: '16px', color: '#08c' }" />
              </template>
            </a-input>
          </div>
          <!-- 邀请码 -->
          <div class="auth-form-item">
            <a-input size="large" placeholder="邀请码">
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
import { auth } from "../../service";
// eslint-disable-next-line no-undef
const regForm = reactive({
  account: "",
  password: "",
});
const register = () => {
  auth.register(regForm.account, regForm.password);
};
</script>

<style scoped lang="scss">
::v-deep .ant-input-prefix {
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

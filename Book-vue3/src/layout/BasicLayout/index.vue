<template>
  <div class="basic-layout">
    <!-- 头部 -->
    <div class="app-header">
      <div class="left">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fu.candou.com%2F2015%2F0831%2F1441006447471.png%3FimageView2%2F2%2Fw%2F388%2Fh%2F416&refer=http%3A%2F%2Fu.candou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672031780&t=cb15db1afe50157d22a7f5d59dd2f9be"
          alt=""
        />
        <div class="title">图书管理系统</div>
      </div>
      <div class="right">
        <div class="hello-msg">你好，
          <strong>{{ userInfo.account }}</strong>
        </div>
        <div class="logout">退出</div>
      </div>
    </div>
    <!-- 占位 div -->
    <div class="app-header-placeholder"></div>
    <!-- 内容 -->
    <div class="app-content">
      <div class="left">
        <app-nav></app-nav>
      </div>
      <div class="right">
        <!-- 路由（切换） -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import appNav from "../Nav/index.vue";
import { useUserStore } from "../../stores/user";
const { userInfo } = useUserStore();
</script>

<style scoped lang="scss">
.basic-layout {
  .app-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 64px;
    background-color: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    z-index: 1;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
      }
      .title {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 900;
        font-size: 20px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .hello-msg {
      }
      .logout {
        width: 80px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        cursor: pointer;
        margin-left: 16px;
        &:hover {
          background-color: #eee;
        }
      }
    }
    &-placeholder {
      width: 100%;
      height: 64px;
    }
  }
  .app-content {
    display: flex;
    .left {
      position: fixed;
      top: 64px;
      bottom: 0;
      width: 256px;
      background-color: #ffffff;
    }
    .right {
      flex: 1;
      padding: 24px;
      margin-left: 256px;
    }
  }
}
</style>

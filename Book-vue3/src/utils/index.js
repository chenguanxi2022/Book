import { message } from "ant-design-vue";

import { createApp } from "vue";
import App from "../App.vue";

// 引入 spaceBetween 组件
import spaceBetween from "../components/SpaceBetween/index.vue";

// 全局组件注册
const app = createApp(App);
app.component("spaceBetween", spaceBetween);

// result
export const result = (response, authShowErrorMsg = true) => {
  const { data } = response;

  if (data.code === 0 && authShowErrorMsg) {
    message.error(data.msg);
  }

  return {
    success(cb) {
      if (data.code !== 0) {
        cb(data, response);
      }
      return this;
    },
    fail(cb) {
      if (data.code === 0) {
        cb(data, response);
      }
      return this;
    },
    finally(cb) {
      cb(data, response);
      return this;
    },
  };
};

// 深拷贝
export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// 时间戳
export const formatTime = (ts) => {
  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  // getMonth 从 0 开始，所以要 + 1
  const MM = date.getMonth() + 1;
  const DD = date.getDate();

  // const hh = date.getHours();
  // const mm = date.getMinutes();
  // const ss = date.getSeconds();

  return `${YYYY}年${MM}月${DD}日`;
};

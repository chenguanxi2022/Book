<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <!-- 分割线 -->
      <a-divider />
      <!-- space-between -->
      <space-between>
        <!-- 搜索框 -->
        <div class="search">
          <a-input-search placeholder="根据书名搜索" enter-button />
        </div>
        <!-- button -->
        <a-button @click="isShow = true">添加一条</a-button>
      </space-between>
      <!-- 分割线 -->
      <a-divider />
      <!-- table -->
      <a-table :columns="columns" :data-source="list">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'date'">
            {{ formatTime(record.date) }}
          </template>
        </template>
      </a-table>
      <!-- And One -->
      <add-one v-model:isShow="isShow"></add-one>
    </a-card>
  </div>
</template>

<script setup>
import addOne from "./AddOne/index.vue";
import { book } from "../../service";
import { formatTime, result } from "../../utils";
// 表格列的配置描述
const columns = [
  {
    title: "书名",
    dataIndex: "name",
  },
  {
    title: "价格",
    dataIndex: "price",
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "出版日期",
    dataIndex: "date",
    // slots: {
    //   customRender: "date",
    // },
  },
  {
    title: "分类",
    dataIndex: "classify",
  },
];
// 弹窗显示与隐藏
// eslint-disable-next-line no-undef
const isShow = ref(false);
// 控制子组件 show
// const setShow = (bool) => {
//   isShow.value = bool;
// };
// 获取书籍列表
// eslint-disable-next-line no-undef
const list = ref([]);
// eslint-disable-next-line no-undef
onMounted(async () => {
  const res = await book.list();
  result(res).success(({ data }) => {
    list.value = data;
  });
});
</script>

<style scoped lang="scss"></style>

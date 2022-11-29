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
      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'date'">
            {{ formatTime(record.date) }}
          </template>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <!-- 空盒子 -->
        <div></div>
        <!-- 分页器 -->
        <a-pagination v-model:current="curPage" :total="total" :pageSize="10"  @change="setPage"/>
      </space-between>
    </a-card>
    <!-- And One -->
    <add-one v-model:isShow="isShow"></add-one>
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
// 获取书籍总数
// eslint-disable-next-line no-undef
const total = ref(0);
// getList（获取书籍列表信息）
const getList = async () => {
  const res = await book.list({
    page: curPage.value,
    size: 10,
  });
  result(res).success(({ data: { list: l, total: t } }) => {
    // console.log(data)
    list.value = l;
    total.value = t;
  });
};
// eslint-disable-next-line no-undef
onMounted(() => {
  getList();
});
// 分页器当前页数
// eslint-disable-next-line no-undef
const curPage = ref(1);
// 页码改变，重新请求
const setPage = (page) => {
  curPage.value = page;
  getList();
};
</script>

<style scoped lang="scss"></style>

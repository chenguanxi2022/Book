<template>
  <div>
    <a-card>
      <h2 style="font-weight: 900">图书列表</h2>
      <!-- 分割线 -->
      <a-divider />
      <!-- space-between -->
      <space-between>
        <!-- 搜索框 -->
        <div class="search">
          <a-input-search
            placeholder="根据书名搜索"
            enter-button
            v-model:value="keyWord"
            @search="onSearch"
            @keyup.enter="onSearch"
          />
          <a href="javascript:;" @click="goBack" v-if="isSearch">返回</a>
        </div>
        <!-- button -->
        <a-button @click="isShow = true">添加一条</a-button>
      </space-between>
      <!-- 分割线 -->
      <a-divider />
      <!-- table -->
      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #bodyCell="{ column, record }">
          <!-- 处理出版日期 -->
          <template v-if="column.dataIndex === 'date'">
            {{ formatTime(record.date) }}
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'actions'">
            <a href="javascript:;" @click="remove(record._id)">删除</a>
          </template>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <!-- 空盒子 -->
        <div></div>
        <!-- 分页器 -->
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :pageSize="10"
          @change="setPage"
        />
      </space-between>
    </a-card>
    <!-- And One -->
    <add-one v-model:isShow="isShow" @getList="getList"></add-one>
  </div>
</template>

<script setup>
import addOne from "./AddOne/index.vue";
import { book } from "../../service";
import { formatTime, result } from "../../utils";
import { message } from "ant-design-vue";
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
  {
    title: "操作",
    dataIndex: "actions",
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
// 搜索书名
// eslint-disable-next-line no-undef
const keyWord = ref("");
// 分页器当前页数
// eslint-disable-next-line no-undef
const curPage = ref(1);
// 是否是搜索状态
// eslint-disable-next-line no-undef
const isSearch = ref(false);
// getList（获取书籍列表信息）
const getList = async () => {
  const res = await book.list({
    page: curPage.value,
    size: 10,
    keyWord: keyWord.value,
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
// 页码改变，重新请求
const setPage = (page) => {
  curPage.value = page;
  getList();
};
// 搜索
const onSearch = () => {
  getList();
  // 强制转换，字符串为空为 false。否则，相反
  isSearch.value = !!keyWord.value;
};
// 返回全部书籍
const goBack = () => {
  keyWord.value = "";
  isSearch.value = false;
  getList();
};
// 删除
const remove = async (id) => {
  const res = await book.remove(id);

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 200px;
  align-items: center;
  a {
    width: 40px;
    margin-left: 16px;
  }
}
</style>

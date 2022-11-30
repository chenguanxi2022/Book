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
        <plus-circle-two-tone
          :style="{ fontSize: '32px', color: '#52c41a', marginRight: '38px' }"
          @click="isShow = true"
        />
      </space-between>
      <!-- 分割线 -->
      <a-divider />
      <!-- table -->
      <a-table
        :columns="columns"
        :data-source="list"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <!-- 库存 -->
          <template v-if="column.dataIndex === 'count'">
            <a
              href="javascript:;"
              @click="updateCount(1, record._id)"
              class="update"
              >入库</a
            >
            <span class="count">{{ record.count }}</span>
            <a
              href="javascript:;"
              @click="updateCount(0, record._id)"
              class="update"
              >出库</a
            >
          </template>
          <!-- 处理出版日期 -->
          <template v-if="column.dataIndex === 'date'">
            {{ formatTime(record.date) }}
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'actions'">
            <a-button
              href="javascript:;"
              size="small"
              @click="toDetail(record)"
              style="margin-right: 5px"
              >详情</a-button
            >
            <a-button
              type="primary"
              href="javascript:;"
              size="small"
              @click="update(record)"
              style="margin-right: 5px"
              >编辑</a-button
            >
            <a-button
              type="danger"
              href="javascript:;"
              size="small"
              @click="remove(record._id)"
              >删除</a-button
            >
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
    <!-- Update -->
    <Update
      :curBook="curBook"
      v-model:isShow="updateShow"
      @getList="getList"
    ></Update>
  </div>
</template>

<script setup>
import addOne from "./AddOne/index.vue";
import Update from "./Update/index.vue";
import { book } from "../../service";
import { formatTime, result } from "../../utils";
import { message, Modal } from "ant-design-vue";
import { PlusCircleTwoTone } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { createVNode } from "vue";
const router = useRouter();
// 表格列的配置描述
const columns = [
  {
    title: "书名",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "价格",
    dataIndex: "price",
    align: "center",
  },
  {
    title: "作者",
    dataIndex: "author",
    align: "center",
  },
  {
    title: "库存",
    dataIndex: "count",
    align: "center",
  },
  {
    title: "出版日期",
    dataIndex: "date",
    align: "center",
    // slots: {
    //   customRender: "date",
    // },
  },
  {
    title: "分类",
    dataIndex: "classify",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
  },
];
// 弹窗显示与隐藏
// eslint-disable-next-line no-undef
const isShow = ref(false);
// eslint-disable-next-line no-undef
const updateShow = ref(false);
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
// 传递数据
// eslint-disable-next-line no-undef
const curBook = reactive({});
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
// 入库、进库
const updateCount = (type, id) => {
  let word = "增加";

  if (!type) {
    word = "减少";
  }
  Modal.confirm({
    title: `要${word}多少库存`,
    content: createVNode("input", { class: "book-input-count" }),
    onOk: async () => {
      const el = document.querySelector(".book-input-count");

      const res = await book.updateCount({
        id,
        type,
        num: el.value,
      });

      result(res).success(({ msg }) => {
        message.success(msg);
        getList();
      });
    },
  });
};
// 修改数据
const update = (record) => {
  updateShow.value = true;
  Object.assign(curBook, record);
};
// 书籍详情
const toDetail = (record) => {
  router.push(`/book/${record._id}`);
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
.count {
  color: #35ea15e7;
  padding: 0 5px;
  font-weight: 600;
}
.update {
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid yellow;
  padding: 3px;
  background-color: greenyellow;
  &:hover {
    background-color: yellow;
  }
}
</style>

<template>
  <div>
    <a-spin :spinning="loading">
      <!-- 卡片 -->
      <a-card :title="props.simple ? '最近操作日志' : ''">
        <div v-if="!props.simple">
          <!-- title -->
          <h2>操作日志</h2>
          <a-divider />
          <!-- table -->
        </div>
        <div>
          <a-table
            bordered
            :data-source="list"
            :columns="columns"
            :pagination="false"
            :scroll="{ x: 'max-content' }"
          >
            <template #bodyCell="{ column, record }">
              <!-- 用户名 -->
              <template v-if="column.dataIndex === 'account'">
                <span>{{ record.user.account }}</span>
              </template>
              <!-- 访问地址 -->
              <!-- <template v-if="column.dataIndex === 'url'">
                <span>{{ record.request.url }}</span>
              </template> -->
              <!-- 记录时间 -->
              <template v-if="column.dataIndex === 'createdAt'">
                <span>{{ formatTime(record.meta.createdAt) }}</span>
              </template>
              <!-- 操作 -->
              <template v-if="column.dataIndex === 'operate'">
                <a href="javascript:;" @click="remove(record)">删除</a>
              </template>
            </template>
          </a-table>
        </div>
        <!-- pagination -->
        <flex-end style="margin-top: 24px" v-if="!props.simple">
          <a-pagination
            v-model:current="curPage"
            :total="total"
            :pageSize="curPageSize"
            @change="setPage"
            @showSizeChange="onShowSizeChange"
          />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { diary } from "../../service";
import { result, formatTime } from "../../utils";
import { getDiaryInfoByPath } from "../../diary";
import { message } from "ant-design-vue";

const props = defineProps({
  simple: Boolean,
});
const curPage = ref(1);
const curPageSize = ref(10);
const total = ref(0);
const list = ref([]);
const loading = ref(true);
const columns = [
  {
    title: "用户名",
    dataIndex: "account",
    align: "center",
  },
  {
    title: "行为",
    dataIndex: "action",
    align: "center",
  },
  {
    title: "记录时间",
    dataIndex: "createdAt",
    align: "center",
  },
  // {
  //   title: "操作",
  //   dataIndex: "operate",
  //   align: "center",
  // },
];

if (!props.simple) {
  columns.push({
    title: "操作",
    dataIndex: "operate",
    align: "center",
  });
}

// 获取日志列表
const getList = async () => {
  loading.value = true;
  const res = await diary.list(curPage.value, curPageSize.value);
  loading.value = false;

  result(res).success(({ data: { list: l, total: t } }) => {
    l.forEach((item) => {
      item.action = getDiaryInfoByPath(item.request.url);
    });
    list.value = l;
    total.value = t;
  });
};
// 分页器
const setPage = (page) => {
  curPage.value = page;
  getList();
};
// 删除
const remove = async ({ _id }) => {
  const res = await diary.remove(_id);

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};
// 改变每页显示条数
const onShowSizeChange = (page, pageSize) => {
  curPage.value = page;
  curPageSize.value = pageSize;
  getList();
};

onMounted(async () => {
  getList();
});
</script>

<style scoped></style>

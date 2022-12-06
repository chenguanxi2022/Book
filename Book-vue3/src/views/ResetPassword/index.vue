<template>
  <div>
    <a-card title="重置密码申请列表">
      <a-table
        bordered
        :pagination="false"
        :data-source="list"
        :columns="columns"
      >
        <template #bodyCell="{ column, record }">
          <!-- 申请时间 -->
          <template v-if="column.dataIndex === 'createdAt'">
            <span>{{ formatTime(record.meta.createdAt) }}</span>
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'operate'">
            <a-button
              type="primary"
              size="small"
              @click="changeStatus(record, 2)"
              >重置</a-button
            >
            <a-button
              size="small"
              style="margin-left: 16px"
              @click="changeStatus(record, 3)"
              >忽略</a-button
            >
          </template>
        </template>
      </a-table>
      <flex-end style="margin-top: 24px">
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :pageSize="20"
          @change="setPage"
        ></a-pagination>
      </flex-end>
    </a-card>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { resetPassword } from "../../service";
import { result, formatTime } from "../../utils";
const list = ref([]);
const curPage = ref(1);
const total = ref(0);
const columns = [
  {
    title: "账户",
    dataIndex: "account",
    align: "center",
  },
  {
    title: "申请时间",
    dataIndex: "createdAt",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "operate",
    align: "center",
  },
];

// 获取列表
const getList = async () => {
  const res = await resetPassword.list(curPage.value, 20);
  result(res).success(({ data: { list: l, total: t } }) => {
    list.value = l;
    total.value = t;
  });
};
// 改变状态
const changeStatus = async ({ _id }, status) => {
  const res = await resetPassword.update(_id, status);

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};
// 分页
const setPage = (page) => {
  curPage.value = page;
  getList();
};

onMounted(() => {
  getList();
});
</script>

<style scoped></style>

<template>
  <div>
    <a-card title="邀请码管理列表">
      <!-- 添加邀请码 -->
      <div>
        <a-input-number
          v-model:value="count"
          placeholder="要添加的个数"
          :min="1"
          :max="100"
          style="width: 150px"
        ></a-input-number>
        <a-button type="primary" style="margin-left: 8px" @click="addInviteCode"
          >添加邀请码</a-button
        >
      </div>
      <a-divider />
      <a-table
        :pagination="false"
        bordered
        :data-source="list"
        :columns="columns"
      >
        <template #bodyCell="{ column, record }">
          <!-- 使用情况 -->
          <template v-if="column.dataIndex === 'user'">
            {{ record.user ? "已使用" : "未使用" }}
          </template>
          <!-- 创建时间 -->
          <template v-if="column.dataIndex === 'date'">
            {{ formatTime(record.meta.createdAt) }}
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'operate'">
            <a-button type="danger" size="small" @click="removeIC(record)"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
      <flex-end style="margin-top: 24px">
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="20"
          @change="setPage"
        ></a-pagination>
      </flex-end>
    </a-card>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { inviteCode } from "../../service";
import { result, formatTime } from "../../utils";

const count = ref("");
const list = ref([]);
const curPage = ref(1);
const total = ref(0);
const columns = [
  {
    title: "邀请码",
    dataIndex: "code",
  },
  {
    title: "是否使用",
    dataIndex: "user",
  },
  {
    title: "创建时间",
    dataIndex: "date",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];

// 获取列表
const getList = async () => {
  const res = await inviteCode.list(curPage.value, 20);

  result(res).success(({ data: { list: l, total: t }, msg }) => {
    list.value = l;
    total.value = t;
    message.success(msg);
  });
};
// 批量添加邀请码
const addInviteCode = async () => {
  const res = await inviteCode.add(count.value);

  count.value = "";

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};
// 删除邀请码
const removeIC = async ({ _id }) => {
  const res = await inviteCode.remove(_id);

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};
// 分页器
const setPage = (page) => {
  curPage.value = page;
  getList();
};

onMounted(() => {
  getList();
});
</script>

<style scoped></style>

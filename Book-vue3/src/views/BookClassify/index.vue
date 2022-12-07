<template>
  <div>
    <a-card title="书籍分类管理">
      <div>
        <a-input
          placeholder="请输入分类"
          style="width: 150px"
          v-model:value="addTitle"
        ></a-input>
        <a-button type="primary" style="margin-left: 8px" @click="add"
          >添加</a-button
        >
      </div>
      <a-divider />
      <a-table
        bordered
        :data-source="list"
        :columns="columns"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <!-- 创建时间 -->
          <template v-if="column.dataIndex === 'date'">
            <span>{{ formatTime(record.meta.createdAt) }}</span>
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'operate'">
            <a-button type="primary" size="small" @click="update(record)"
              >修改</a-button
            >
            <a-button
              type="danger"
              size="small"
              @click="remove(record)"
              style="margin-left: 12px"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { createVNode, onMounted, ref } from "vue";
import { formatTime, result } from "../../utils";
import { bookClassify } from "../../service";
import { message, Modal } from "ant-design-vue";

const list = ref([]);
const addTitle = ref("");
const columns = [
  {
    title: "分类",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "date",
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
  const res = await bookClassify.list();

  result(res).success(({ msg, data }) => {
    message.success(msg);
    list.value = data;
  });
};
// 添加
const add = async () => {
  const res = await bookClassify.add(addTitle.value);

  result(res).success(({ msg }) => {
    message.success(msg);
    addTitle.value = "";
    getList();
  });
};
// 修改
const update = async ({ _id }) => {
  Modal.confirm({
    title: "请输入新的分类名称",
    content: createVNode("input", { class: "book-classify" }),
    onOk: async () => {
      const title = document.querySelector(".book-classify").value;

      const res = await bookClassify.update(_id, title);

      result(res).success(({ msg }) => {
        message.success(msg);
        // getList();
        list.value.forEach((item) => {
          if (item._id === _id) {
            item.title = title;
          }
        });
      });
    },
  });
};
// 删除
const remove = async ({ _id }) => {
  const res = await bookClassify.remove(_id);

  result(res).success(({ msg }) => {
    message.success(msg);
    getList();
  });
};

onMounted(() => {
  getList();
});
</script>

<style scoped></style>

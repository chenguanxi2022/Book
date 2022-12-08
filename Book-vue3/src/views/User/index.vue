<template>
  <div>
    <a-card>
      <!-- title -->
      <h2>用户管理</h2>
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据账户搜索"
            enter-button
            v-model:value="keyWord"
            @search="onSearch"
            @keyup.enter="onSearch"
          />
          <a href="javascript:;" @click="goBack" v-if="isSearch">返回</a>
        </div>
        <div>
          <!-- 添加用户 -->
          <a-button @click="showAddModal = true" style="margin-right: 24px"
            >添加用户</a-button
          >
          <!-- 上传 excel -->
          <a-upload
            @change="onUploadChange"
            action="http://localhost:3000/upload/file"
            :headers="headers"
          >
            <a-button type="primary">上传 Excel</a-button>
          </a-upload>
        </div>
      </space-between>
      <a-divider />
      <!-- table -->
      <div>
        <a-table
          bordered
          :data-source="userList"
          :columns="columns"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <!-- 创建日期 -->
            <template v-if="column.dataIndex === 'createdAt'">
              {{ formatTime(record.meta.createdAt) }}
            </template>
            <!-- 角色 -->
            <template v-if="column.dataIndex === 'character'">
              <edit-two-tone two-tone-color="#eb2f96" @click="onEdit(record)" />
              {{ getCharacterInfoById(record.character).title }}
            </template>
            <!-- 操作 -->
            <template v-if="column.dataIndex === 'actions'">
              <a-button
                type="primary"
                size="small"
                @click="resetPassword(record._id)"
                >重置</a-button
              >
              <a-button
                type="danger"
                size="small"
                style="margin-left: 16px"
                @click="remove(record._id)"
                >删除</a-button
              >
            </template>
          </template>
        </a-table>
      </div>
      <!-- pagination -->
      <flex-end class="pagination" v-if="!isSearch">
        <a-pagination
          v-model:current="userCurPage"
          :total="userTotal"
          :pageSize="5"
          @change="setPage"
        ></a-pagination>
      </flex-end>
    </a-card>
    <add-one v-model:isShow="showAddModal" @getList="getUserList"></add-one>
    <a-modal
      :visible="showEditModal"
      title="修改角色"
      @ok="submit"
      @cancel="close"
    >
      <a-select v-model:value="editForm.character" style="width: 120px">
        <a-select-option
          v-for="item in characterInfo"
          :key="item._id"
          v-model:value="item._id"
          >{{ item.title }}</a-select-option
        >
      </a-select>
    </a-modal>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { onMounted, ref, reactive } from "vue";
import { character, user } from "../../service";
import { result, formatTime } from "../../utils";
import addOne from "./AddOne/index.vue";
import { getCharacterInfoById } from "../../character";
import { EditTwoTone } from "@ant-design/icons-vue";
import { useCharacterStore } from "../../stores/character";
import { getHeaders } from "../../utils/request";
const headers = getHeaders();

// store
const store = useCharacterStore();
// characterInfo
const { characterInfo } = store;

const userList = ref([]);
const userCurPage = ref(1);
const userTotal = ref(0);
const showAddModal = ref(false);
const keyWord = ref("");
const isSearch = ref(false);
const showEditModal = ref(false);
const editForm = reactive({
  character: "",
  current: {},
});

const columns = [
  {
    title: "账户",
    dataIndex: "account",
    align: "center",
  },
  {
    title: "创建日期",
    dataIndex: "createdAt",
    align: "center",
  },
  {
    title: "角色",
    dataIndex: "character",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "actions",
    align: "center",
  },
];

onMounted(() => {
  getUserList();
});

// 获取用户列表
const getUserList = async () => {
  const res = await user.list(userCurPage.value, 5, keyWord.value);

  result(res).success(({ data: { list, page, total }, msg }) => {
    message.success(msg);
    userList.value = list;
    userCurPage.value = page;
    userTotal.value = total;
  });
};

// 切页实现
const setPage = (page) => {
  userCurPage.value = page;
  getUserList();
};

// 删除
const remove = async (id) => {
  const res = await user.remove(id);

  result(res).success(({ msg }) => {
    message.success(msg);
    getUserList();
  });
};
// resetPassword
const resetPassword = async (id) => {
  const res = await user.resetPassword(id);

  result(res).success(({ msg }) => {
    message.success(msg);
  });
};
// 账户名搜索
const onSearch = () => {
  getUserList();
  isSearch.value = true;
};
// 返回
const goBack = () => {
  keyWord.value = "";
  isSearch.value = false;
  getUserList();
};
// 修改角色
const onEdit = (record) => {
  showEditModal.value = true;
  editForm.character = record.character;
  editForm.current = record;
};
// 关闭 showEditModal
const close = () => {
  showEditModal.value = false;
};
// 点击 showEditModal 的 OK
const submit = async () => {
  showEditModal.value = false;
  const res = await character.edit(editForm.character, editForm.current._id);

  result(res).success(({ msg }) => {
    message.success(msg);
    editForm.current.character = editForm.character;
  });
};
// 上传文件事件
const onUploadChange = ({ file }) => {
  if (file.response) {
    result(file.response).success(async (data) => {
      await user.addMany(data);
      getUserList();
    });
  }
};
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 24px;
}
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

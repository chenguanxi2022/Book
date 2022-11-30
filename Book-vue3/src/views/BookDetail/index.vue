<template>
  <div>
    <!-- 基本信息 -->
    <a-card>
      <!-- flex 左右对齐 -->
      <space-between>
        <div>
          <h2>{{ detailInfo.name }}</h2>
        </div>
        <div>
          <a-button size="small" type="primary" @click="update">编辑</a-button>
          &nbsp;&nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <!-- 分割线 -->
      <a-divider />
      <div class="base-info">
        <!--  -->
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="container">{{ detailInfo.price }}</div>
          </div>
          <div class="item">
            <div class="title">作者</div>
            <div class="container">{{ detailInfo.author }}</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="container">{{ detailInfo.classify }}</div>
          </div>
        </div>
        <!--  -->
        <div class="items">
          <div class="item">
            <div class="title">出版日期</div>
            <div class="container">{{ formatTime(detailInfo.date) }}</div>
          </div>
        </div>
      </div>
      <!-- Update -->
      <Update
        :curBook="detailInfo"
        v-model:isShow="updateShow"
        @getList="getDetail"
      />
    </a-card>
    <!-- 出入库信息 -->
    <div class="log">
      <!-- 日志 -->
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter('0')">
              <check-circle-two-tone two-tone-color="#52c41a" v-if="logCurType === '0'" />
              出库日志</a>
          </span>
          <span style="margin-left: 12px">
            <a href="javascript:;" @click="logFilter('1')">
              <check-circle-two-tone two-tone-color="#52c41a" v-if="logCurType === '1'"/>
              入库日志</a>
          </span>
        </template>
        <!-- table -->
        <div>
          <a-table bordered :pagination="false" :columns="columns" :data-source="logInfo">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'createdAt'">
                {{ formatTime(record.meta.createdAt) }}
              </template>
            </template>
          </a-table>
        </div>
        <space-between style="margin-top: 24px">
          <div />
          <a-pagination
            v-model:current="logCurPage"
            :total="logTotal"
            :pageSize="10"
            @change="setPage"
          ></a-pagination>
        </space-between>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { book, log } from "../../service";
import { result, formatTime } from "../../utils";
import Update from "../Book/Update/index.vue";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const columns = [
  {
    title: "数量",
    dataIndex: "num",
  },
  {
    title: "操作时间",
    dataIndex: "createdAt",
  },
];
// isShow
// eslint-disable-next-line no-undef
const updateShow = ref(false);
// 详情信息
// eslint-disable-next-line no-undef
const detailInfo = ref({});
// 日志信息
// eslint-disable-next-line no-undef
const logInfo = ref([]);
// type 类型总数，当前页数
// eslint-disable-next-line no-undef
const logTotal = ref(0);
// eslint-disable-next-line no-undef
const logCurPage = ref(1);
// 当前日志类型
// eslint-disable-next-line no-undef
const logCurType = ref("1");
// eslint-disable-next-line no-undef
onMounted(() => {
  getDetail();
  getLog();
});
// 获取日志
const getLog = async () => {
  const res = await log.list(logCurType.value, logCurPage.value, 10);

  result(res).success(({ data: { list, page, total }, msg }) => {
    message.success(msg);
    logInfo.value = list;
    logTotal.value = total;
    logCurPage.value = page;
  });
};
// 获取详情
const getDetail = async () => {
  const res = await book.detail(id);

  result(res).success(({ msg, data }) => {
    message.success(msg);
    detailInfo.value = data;
  });
};
// 删除
const remove = async () => {
  const res = await book.remove(id);

  result(res).success((msg) => {
    message.success(msg);
    router.replace("/book");
  });
};
// 编辑
const update = () => {
  updateShow.value = true;
};
// 页码改变，重新请求
const setPage = (page) => {
  logCurPage.value = page;
  getLog();
};
// 筛选日志
const logFilter = (type) => {
  logCurType.value = type;
  getLog();
};
</script>

<style scoped lang="scss">
.base-info {
  .items {
    display: flex;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
    .item {
      flex: 1;
      display: flex;
      .title {
        min-width: 70px;
        font-weight: 700;
        color: rgba($color: #000000, $alpha: 0.7);
      }
      .container {
      }
    }
  }
}
.log {
  margin-top: 24px;
}
</style>

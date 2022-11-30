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
            <a href="javascript:;">出库日志</a>
          </span>
          <span style="margin-left: 12px">
            <a href="javascript:;">入库日志</a>
          </span>
        </template>
        <!-- table -->
        <div>
          <a-table bordered :pagination="false" />
        </div>
        <space-between style="margin-top: 24px">
          <div />
          <a-pagination></a-pagination>
        </space-between>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { book } from "../../service";
import { result, formatTime } from "../../utils";
import Update from "../Book/Update/index.vue";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
// isShow
// eslint-disable-next-line no-undef
const updateShow = ref(false);
// 详情信息
// eslint-disable-next-line no-undef
const detailInfo = ref({});
// eslint-disable-next-line no-undef
onMounted(() => {
  getDetail();
});
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

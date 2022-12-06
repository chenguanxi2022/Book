<template>
  <div>
    <!-- title -->
    <a-spin :spinning="loading">
      <a-card>
        <div class="title">
          <div class="title-item">
            <div class="title-item-count">共 {{ baseInfo.book }} 本</div>
            <div class="title-item-title">书籍</div>
          </div>
          <div class="title-item">
            <div class="title-item-count">共 {{ baseInfo.user }} 位</div>
            <div class="title-item-title">用户</div>
          </div>
          <div class="title-item">
            <div class="title-item-count">共 {{ baseInfo.diary }} 条</div>
            <div class="title-item-title">日志</div>
          </div>
        </div>
      </a-card>
    </a-spin>
    <!-- content -->
    <div class="table-list">
      <div class="table-list-left">
        <Book simple />
      </div>
      <div class="table-list-right">
        <Diary simple />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { message } from "ant-design-vue";
import { dashboard } from "../../service";
import { result } from "../../utils";
import Book from "../Book/index.vue";
import Diary from "../Diary/index.vue";
const loading = ref(true);
const baseInfo = ref({
  book: 0,
  user: 0,
  diary: 0,
});

const getBaseInfo = async () => {
  loading.value = true;
  const res = await dashboard.baseInfo();
  loading.value = false;

  result(res).success(({ data }) => {
    baseInfo.value = data;
  });
};

onMounted(() => {
  getBaseInfo();
});
</script>

<style scoped lang="scss">
.title {
  display: flex;
  &-item {
    flex: 1;
    &-title {
      color: #666;
      font-weight: 700;
    }
    &-count {
      font-weight: 700;
      color: black;
      font-size: 20px;
    }
  }
}
.table-list {
  margin-top: 24px;
  display: flex;
  &-left {
    flex: 1;
    margin-right: 12px;
  }
  &-right {
    flex: 1;
    margin-left: 12px;
  }
}
</style>

<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <!-- 分割线 -->
      <a-divider />
      <!-- space-between -->
      <space-between>
        <!-- 搜索框 -->
        <div class="search">
          <a-input-search
            v-model:value="value"
            placeholder="根据书名搜索"
            enter-button
          />
        </div>
        <!-- button -->
        <a-button>添加一条</a-button>
      </space-between>
      <!-- 分割线 -->
      <a-divider />
      <!-- table -->
      <a-table :columns="columns" :data-source="data"></a-table>
    </a-card>
  </div>
</template>

<script setup>
// 表格列的配置描述
const columns = [
  {
    title: "名字",
    dataIndex: "name"
  },
  {
    title: "年龄",
    dataIndex: "age"
  },
]
// 数据数组
const data = [
  {
    name: '小红',
    age: 19,
  }
]
</script>

<style scoped lang="scss">

</style>

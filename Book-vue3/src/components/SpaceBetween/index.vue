<template>
  <div class="space-between">
    <!-- 插槽 -->
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.space-between {
  display: flex;
  justify-content: space-between;
}
</style>
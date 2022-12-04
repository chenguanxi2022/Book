<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 100%"
      mode="inline"
      v-for="item in menu"
      :key="item.url"
    >
      <a-sub-menu v-if="item.children">
        <template #title>{{ item.title }}</template>
        <a-menu-item
          v-for="child in item.children"
          :key="child.url"
          @click="to(child.url)"
        >
          {{ child.title }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" v-else :key="item.url">
        {{ item.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import menu from "../../config/menu";

const router = useRouter();
const route = useRoute();
const openKeys = ref([]);
const selectedKeys = ref([]);

const to = (url) => {
  router.push(url);
};

onMounted(() => {
  selectedKeys.value = [route.path];
});
</script>

<style scoped lang="scss"></style>

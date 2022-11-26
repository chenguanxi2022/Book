import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Vue 自动导入
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
    }),
    // AntDesignVue 自动引入
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});

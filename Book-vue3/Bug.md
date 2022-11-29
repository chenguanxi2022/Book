## 1.eslint 报错 index 不能单名字
```js
rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"],
      },
    ],
  },
```

## 2.自定义事件可以用于开发支持 v-model 的自定义表单组件。
```js
// 父组件
v-model:isShow = isShow
// 子组件 update
const emits = defineEmits(['update:isShow'])
emits('update:isShow',false)
```

## 3.Vue 使用 JSX 语法
```js
npm i -D @vitejs/plugin-vue-jsx
```
`vite.config.js`中写入
```js
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vueJsx(), ...],
  ...
})
```

## 4.Vue3.2 `reactive`不需要 `.value`
> 切记切记！！！
```js
// 响应式对象合并
Object.assign(target, prev)
```

## 5.Vue3.2 `watch` 监听对象包对象，记得使用 `deep: true`
> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## 6.注意方法后括号要跟传的参数，千万不要瞎写

## 7.时间戳的转换
```js
dayjs(Number(date))
// 转换为 M 
date.valueOf()
// 转换为时间戳
```
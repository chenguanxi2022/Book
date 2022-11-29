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
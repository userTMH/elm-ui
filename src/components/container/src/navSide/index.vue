<template>
  <m-menu defaultActive="/" :data="menuList" router></m-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 接受父组件传递的值
defineProps<{
  collapse: boolean;
}>();

const menuList = ref([
  {
    icon: "HomeFilled",
    name: "首页",
    index: "/",
  },
  {
    icon: "Check",
    name: "图标选择器",
    index: "/chooseIcon",
  },
  {
    icon: "Location",
    name: "省市区选择",
    index: "/chooseArea",
  },
  {
    icon: "Sort",
    name: "趋势标记",
    index: "/trend",
  },
  {
    icon: "Timer",
    name: "时间选择",
    index: "/chooseTime",
  },
  {
    icon: "Bell",
    name: "通知菜单",
    index: "/notification",
  },
  {
    icon: "Menu",
    name: "导航菜单",
    index: "/menu",
  },
  {
    icon: "TurnOff",
    name: "城市选择",
    index: "/chooseCity",
  },
  {
    icon: "DArrowRight",
    name: "进度条",
    index: "/progress",
  },
  {
    icon: "ScaleToOriginal",
    name: "日历",
    index: "/calendar",
  },
  {
    icon: "Setting",
    name: "表单",
    index: "/form",
  },
  {
    icon: "Setting",
    name: "弹出框表单",
    index: "/modalForm",
  },
  {
    icon: "ShoppingBag",
    name: "表格",
    index: "/table",
  },
]);
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

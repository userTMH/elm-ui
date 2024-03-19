<template>
  <el-menu
    v-bind="$attrs"
    :router="router"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
  >
    <!-- el-menu-item  
      el-sub-menu -->
    <template v-for="(item, index) in data">
      <!-- 渲染一级数据 el-menu-item  -->
      <el-menu-item
        :key="index"
        v-if="!item.children || !item!.children!.length"
        :index="item.index"
      >
        <component :is="`el-icon-${toLine(item.icon!)}`"></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <!-- 渲染二级数据 el-sub-menu -->
      <el-sub-menu
        :key="index"
        :index="item.index"
        v-if="item.children && item.children!.length > 0"
      >
        <template #title>
          <component :is="`el-icon-${toLine(item.icon!)}`"></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <component :is="`el-icon-${toLine(item1.icon!)}`"></component>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { MenuItem } from "./types";
import { toLine } from "../../../utils";
// 接受父组件传递的菜单数据
defineProps({
  data: {
    // 指定传递的参数类型,
    type: Array as PropType<MenuItem[]>,
    // 如果没有传的话, 默认为空数组
    default: () => [],
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

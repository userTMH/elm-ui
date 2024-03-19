<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="collapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 父传子 子组件接受到父组件的数据在 props 中 props中的数据不能直接 单向 无法修改 -->
        <!-- 父传子, 子组件修改了之后,父组件能够实时更新, 如果将传递的数据变成双向的, 可以修改 -->
        <nav-header v-model:collapse="collapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavHeader from "./navHeader/index.vue";
import NavSide from "./navSide/index.vue";

// 控制菜单的展开与收起  false 展开 true 收起
const collapse = ref(false);
</script>

<style scoped lang="scss">
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>

<template>
  <div class="header">
    <span @click="toggle">
      <!-- 收缩时,显示展开图标 expand 展开图标 -->
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <!-- 展开时.显示收缩图标 fold 收起 -->
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
// 接受父组件传递的值
const props = defineProps<{
  collapse: boolean;
}>();

// 子传父
const emits = defineEmits(["update:collapse"]);

// 控制菜单的展开与收起方法
const toggle = () => {
  emits("update:collapse", !props.collapse);
};
</script>

<style scoped lang="scss">
.header {
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>

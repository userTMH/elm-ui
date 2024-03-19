<template>
  <div>
    <m-choose-icon title="选择图标" v-model:visible="visible">
      选择图标
    </m-choose-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 是否显示弹窗 true 显示 false 不显示
const visible = ref(false);
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <!-- 接受父组件传递进来所有数据, 不包括props中接受的数据 -->
    <m-menu :data="data" defaultActive="2" router></m-menu>
  </div>
</template>
<script lang="ts" setup>
const data = [
  {
    name: "导航1",
    index: "1",
    icon: "document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "document",
      },
      {
        name: "导航3-2",
        index: "3-2",
        icon: "document",
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>

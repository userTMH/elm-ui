<template>
  <div>
    <m-choose-area @change="getData"></m-choose-area>
  </div>
</template>

<script lang="ts" setup>
import { Data } from "../../components/chooseArea/src/types";

const getData = (areas: Data) => {
  console.log("areas", areas);
};
</script>

<style scoped lang="scss"></style>
